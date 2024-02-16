import { z } from "zod"
import { taskSchemas, taskCreateSchemas, taksUpdateSchema} from "../schemas/task.schemas"

export type TTaksSchema = z.infer<typeof taskSchemas>

export type TTaskCreateSchema = z.infer<typeof taskCreateSchemas>

export type TTaskUpdateSchema = z.infer<typeof taksUpdateSchema>
