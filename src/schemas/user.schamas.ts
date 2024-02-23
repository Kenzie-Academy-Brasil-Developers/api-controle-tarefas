import { z } from "zod"


export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(8)
})

export const userRegisterBodySchema = userSchema.omit({ id: true })

export const userLoginBodySchema = userSchema.omit({ id: true, name: true }) 

export const userReturnSchema = userSchema.omit({ password: true })
