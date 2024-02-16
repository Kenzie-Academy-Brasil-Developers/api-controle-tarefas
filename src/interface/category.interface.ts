import { z } from "zod"
import { categorySchemas,categoryCreateSchema } from "../schemas/category.schemas"

export type TCategorySchema = z.infer<typeof categorySchemas>

export type TCategoryCreateSchema = z.infer<typeof categoryCreateSchema>