import { Router } from "express"
import { TaskControllers } from "../controllers/task.controllers"
import { EnsureMiddleware } from "../middlewares/ensure.middleware"
import { taksUpdateSchema, taskCreateSchemas } from "../schemas/task.schemas"

export const taksRouter = Router()

const ensure = new EnsureMiddleware()

const taksControllers = new TaskControllers()

taksRouter.post(
    "/",
    ensure.validateBody(taskCreateSchemas),
    ensure.bodyCategoyIdExists,
    taksControllers.create
)

taksRouter.get(
    "/",
    taksControllers.getTasks
)

taksRouter.use(
    "/:id",
    ensure.taskIdValid
)

taksRouter.get(
    "/:id",
    taksControllers.getOneTask
)

taksRouter.patch(
    "/:id",
    ensure.validateBody(taksUpdateSchema),
    ensure.bodyCategoyIdExists,
    taksControllers.update
)

taksRouter.delete(
    "/:id",
    taksControllers.delete
)



