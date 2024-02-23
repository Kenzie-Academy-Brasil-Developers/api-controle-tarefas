import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";

import { categoryCreateSchema } from "../schemas/category.schemas";
import { EnsureMiddleware } from "../middlewares/ensure.middleware";


export const categoryRouter = Router()

const ensure = new EnsureMiddleware()

const categoryControllers = new CategoryControllers()

categoryRouter.post(
    "/",
    ensure.validateBody(categoryCreateSchema),
    categoryControllers.create
)

categoryRouter.delete(
    "/:id",
    ensure.categoryValid,
    categoryControllers.delete
)

