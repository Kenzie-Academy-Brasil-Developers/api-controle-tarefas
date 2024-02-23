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
    (req, res) => userControllers.register(req, res)
)

userRouter.post(
    "/login",
    ensure.validateBody(userLoginBodySchema),
    (req, res) => userControllers.login(req, res)
)

userRouter.get(
    "/profile",
    VerifyToken.execute,
    (req, res) => userControllers.getUser(req, res)
)