import { Router } from "express"
import { TaskControllers } from "../controllers/task.controllers"

export const taksRouter = Router()

const taksControllers = new TaskControllers()

taksRouter.post("/", taksControllers.create)

taksRouter.get("/", taksControllers.findMany)

taksRouter.get("/:id", taksControllers.findOne)

taksRouter.patch("/:id", taksControllers.update)

taksRouter.delete("/:id", taksControllers.delete)



