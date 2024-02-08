import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";


export const categoryRouter = Router()

const categoryControllers = new CategoryControllers()

categoryRouter.post("/", categoryControllers.create)

categoryRouter.delete("/:id", categoryControllers.delete)

