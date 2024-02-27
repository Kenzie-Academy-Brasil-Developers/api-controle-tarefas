import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import { EnsureMiddleware } from "../middlewares/ensure.middleware";
import { userLoginBodySchema, userRegisterBodySchema } from "../schemas/user.schamas";
import { VerifyToken } from "../middlewares/verifyToken.midleware";

const ensure = new EnsureMiddleware()

const userControllers = new UserControllers()

export const userRouter = Router()

userRouter.post(
    "/",
    ensure.validateBody(userRegisterBodySchema),
    ensure.emailIsUnique,
    userControllers.register
)

userRouter.post(
    "/login",
    ensure.validateBody(userLoginBodySchema),
    userControllers.login
)

userRouter.get(
    "/profile",
    VerifyToken.execute,
    userControllers.getUser
)