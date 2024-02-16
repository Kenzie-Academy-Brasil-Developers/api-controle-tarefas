import { z } from "zod";

export const categorySchemas = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
})

export const categoryCreateSchema = categorySchemas.omit({id: true})

 