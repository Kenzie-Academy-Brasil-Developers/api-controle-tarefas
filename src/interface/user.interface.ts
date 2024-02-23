import { z } from "zod"
import { 
    userLoginBodySchema, 
    userRegisterBodySchema, 
    userReturnSchema, 
    userSchema 
} from "../schemas/user.schamas"

export type TUser = z.infer<typeof userSchema>

export type TUserLoginBody = z.infer<typeof userLoginBodySchema>

export type TUserReturn = z.infer<typeof userReturnSchema>

export type TLoginReturn = {
   accessToken: string
   user: TUserReturn
}

export type TUserRegisterBody = z.infer<typeof userRegisterBodySchema>