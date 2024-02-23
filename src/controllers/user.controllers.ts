import { Request, Response } from "express"
import { UserServices } from "../services/user.services"

export class UserControllers{
   private userServices: UserServices = new UserServices()

    async register(req: Request, res: Response): Promise<Response>{
        const response = await this.userServices.register(req.body)

        return res.status(201).json(response)
    }

    async login(req: Request, res: Response): Promise<Response>{
        const response = await this.userServices.login(req.body)

        return res.status(200).json(response)
    }

    async getUser(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode

        const response = await this.userServices.getUser(id)

        return res.status(200).json(response)        
    }
}