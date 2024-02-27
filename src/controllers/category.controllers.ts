import { Request, Response } from "express"
import { CategoryServices } from "../services/category.service"


export class CategoryControllers{
    
    private categoryServices = new CategoryServices()

    create = async (req: Request, res: Response): Promise<Response> => {
        const { id } = res.locals.decode

        const response = await this.categoryServices.create(req.body, id)

        return res.status(201).json(response)
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryServices.delete(req.params.id)

        return res.status(204).json()
    }
}

