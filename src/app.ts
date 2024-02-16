import "express-async-errors"
import express, { json } from "express"
import helmet from "helmet"
import { taksRouter } from "./routes/taks.router"
import { categoryRouter } from "./routes/category.routes"
import { HandleErrors } from "./middlewares/handleErrors.middlewares"

export const app = express()

app.use(helmet())

app.use(json())

app.use("/tasks", taksRouter)

app.use("/categories", categoryRouter)

app.use(HandleErrors.execute)