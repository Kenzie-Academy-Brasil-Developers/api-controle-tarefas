import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { EnsureMiddleware } from "../middlewares/ensure.middleware";
import { VerifyToken } from "../middlewares/verifyToken.midleware";
import { IsUserOwner } from "../middlewares/isUserOwner.middleware";


export const categoryRouter = Router()

const isUserOwner = new IsUserOwner()

const ensure = new EnsureMiddleware()

const categoryControllers = new CategoryControllers()

categoryRouter.post(
    "/",
    VerifyToken.execute,
    ensure.validateBody(categoryCreateSchema),
    categoryControllers.create
)

categoryRouter.delete(
    "/:id",
    VerifyToken.execute,
    ensure.categoryValid,
    isUserOwner.categoryOwner,
    categoryControllers.delete
)

