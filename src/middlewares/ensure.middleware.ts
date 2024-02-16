import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class EnsureMiddleware {

    validateBody = (schema: AnyZodObject) => {

        return (req: Request, res: Response, next: NextFunction): void => {
            
            req.body = schema.parse(req.body)

            return next()
        }
    }

    bodyCategoyIdExists = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        const {categoryId} = req.body

        if(!categoryId){
            return next()
        }

        const foundCategory = await prisma.category.findFirst({
            where: { id: Number(categoryId) }
        })

        if (!foundCategory) {
            throw new AppError(404, "Category not found")
        }
        
        return next()
    }

    taskIdValid = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        const { id } = req.params

        const foundTask = await prisma.task.findFirst({
            where: { id: Number(id) }
        })

        if (!foundTask) {
            throw new AppError(404, "Task not found")
        }

        res.locals= {...res.locals, foundTask}

        return next()
    }

    categoryValid = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        const { id } = req.params

        const foundCategory = await prisma.category.findFirst({
            where: { id: Number(id) }
        })

        if (!foundCategory) {
            throw new AppError(404, "Category not found")
        }

        res.locals= {...res.locals, foundCategory}

        return next()
    }
}

