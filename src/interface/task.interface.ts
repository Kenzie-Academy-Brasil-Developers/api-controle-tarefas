import { z } from "zod"
import { taskSchemas, taskCreateSchemas, taksUpdateSchema, categoryReturnSchemas} from "../schemas/task.schemas"

export type TTaksSchema = z.infer<typeof taskSchemas>

export type TTaskCreateSchema = z.infer<typeof taskCreateSchemas>

export type TTaskUpdateSchema = z.infer<typeof taksUpdateSchema>

export type TTaskReturnCategory = z.infer<typeof categoryReturnSchemas>
