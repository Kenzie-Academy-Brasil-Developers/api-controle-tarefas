import { hash, compare } from "bcryptjs"
import  { sign } from "jsonwebtoken"
import { TLoginReturn, TUserLoginBody, TUserRegisterBody, TUserReturn } from "../interface/user.interface"
import { prisma } from "../database/prisma"
import { userReturnSchema } from "../schemas/user.schamas"
import { AppError } from "../errors/appError"


export class UserServices {

    register = async (body: TUserRegisterBody): Promise<TUserReturn> => {
        
        const hashPassword = await hash(body.password, 10)

        const newUser: TUserRegisterBody = {
            ...body,
            password: hashPassword,
        }

        const data = await prisma.user.create({ data: newUser })

        return userReturnSchema.parse(data)
    }

    login = async (body: TUserLoginBody): Promise<TLoginReturn> => {

        const user = await prisma.user.findFirst({ where: { email: body.email } })

        if (!user) {
            throw new AppError(404, "User not exists")
        }

        const samePassword = await compare(body.password, user.password)

        if (!samePassword) {
            throw new AppError(401, "Email and password doesn't match")
        }

        const token:string = sign({}, process.env.JWT_SECRET as string, {
            subject: user.id.toString(), 
            expiresIn: "12h",
        })

        return {
            accessToken: token,
            user: userReturnSchema.parse(user),
        }
    }

    getUser = async (id: number): Promise<TUserReturn> => {
        const user = await prisma.user.findFirst({
            where: { id }
        });

        return userReturnSchema.parse(user)
    }
}

