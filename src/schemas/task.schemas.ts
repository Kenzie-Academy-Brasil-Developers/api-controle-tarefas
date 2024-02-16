import { z } from "zod"
import { categorySchemas } from "./category.schemas"

export const taskSchemas = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    category: categorySchemas.nullish()
})

export const taskCreateSchemas = taskSchemas
.omit({
    id: true,
    category: true
})
.extend({ 
    categoryId: z.number().positive().nullish() 
})

export const taksUpdateSchema = taskCreateSchemas.partial()

