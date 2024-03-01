import "express-async-errors"
import "reflect-metadata"
import express, { json } from "express"
import helmet from "helmet"
import cors from "cors"
import { taksRouter } from "./routes/taks.router"
import { categoryRouter } from "./routes/category.router"
import { HandleErrors } from "./middlewares/handleErrors.middlewares"
import { userRouter } from "./routes/user.router"

export const app = express()

app.use(helmet())

app.use(cors())

app.use(json())

app.use("/users", userRouter)

app.use("/tasks", taksRouter)

app.use("/categories", categoryRouter)

app.use(HandleErrors.execute)