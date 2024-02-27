import { z } from "zod"

export const categorySchemas = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    userId: z.number().positive()
})

export const categoryCreateSchema = categorySchemas.omit({id: true, userId: true})

 