import { Request, Response } from "express";
import { TaskServices } from "../services/task.service";

export class TaskControllers {

    private taksServices: TaskServices = new TaskServices()

    create = async (req: Request, res: Response): Promise<Response> => {
        const response = await this.taksServices.create(req.body)

        return res.status(201).json(response)
    }

    getTasks = async (req: Request, res: Response): Promise<Response> => {
        const nameCategory = req.query.category as string | undefined 

        const response = await this.taksServices.getTasks(nameCategory)

        return res.status(200).json(response)
    }

    getOneTask = async (req: Request, res: Response): Promise<Response> => {
        const response = await this.taksServices.getOneTask(req.params.id)

        return res.status(200).json(response)
    }

    update =  async (req: Request, res: Response): Promise<Response> => {
        const response = await this.taksServices.update(req.params.id, req.body)

        return res.status(200).json(response)
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        await this.taksServices.delete(req.params.id)

        return res.status(204).json()
    }
}