import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryControllers{
    
    private categoryServices = new CategoryServices()

    create = async (req: Request, res: Response): Promise<Response> => {
        const response = await this.categoryServices.create(req.body)

        return res.status(201).json(response)
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryServices.delete(req.params.id)

        return res.status(204).json()
    }
}

