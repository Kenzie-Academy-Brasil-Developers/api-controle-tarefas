import { z } from "zod";

const taskSchemas = z.object({
    id: z.number().positive(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean(),
    categoryId: z.number().optional()
})

const taskCreateSchemas = taskSchemas.pick({
    title: true,
    content: true,
    finished: true,    
})