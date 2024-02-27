import { z } from "zod"
import { categorySchemas } from "./category.schemas"

export const taskSchemas = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    userId: z.number().positive(),
    category: categorySchemas.nullish()
})

export const taskReturnSchemas = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    userId: z.number().positive(),
})

export const categoryReturnSchemas = taskReturnSchemas.extend({ category: categorySchemas.nullish() })

export const taskCreateSchemas = taskSchemas
    .omit({
        id: true,
        userId: true,
        category: true
    })
    .extend({
        categoryId: z.number().positive().nullish()
    })

export const taksUpdateSchema = taskCreateSchemas.partial()

