import { Router } from "express"
import { TaskControllers } from "../controllers/task.controllers"
import { EnsureMiddleware } from "../middlewares/ensure.middleware"
import { taksUpdateSchema, taskCreateSchemas } from "../schemas/task.schemas"
import { VerifyToken } from "../middlewares/verifyToken.midleware"
import { IsUserOwner } from "../middlewares/isUserOwner.middleware"

export const taksRouter = Router()

const ensure = new EnsureMiddleware()

const isUserOwner = new IsUserOwner()

const taksControllers = new TaskControllers()

taksRouter.post(
    "/",
    VerifyToken.execute,
    ensure.validateBody(taskCreateSchemas),
    ensure.bodyCategoyIdExists,
    taksControllers.create
)

taksRouter.get(
    "/",
    VerifyToken.execute,
    taksControllers.getTasks
)

taksRouter.use(
    "/:id",
    VerifyToken.execute,
    ensure.taskIdValid,
    isUserOwner.taskOwner
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



