import { prisma } from "../database/prisma";
import { TTaksSchema, TTaskCreateSchema, TTaskUpdateSchema } from "../interface/task.interface";
import { taskSchemas } from "../schemas/task.schemas";

export class TaskServices {

    create = async (body: TTaskCreateSchema): Promise<TTaksSchema> => {

        const newTask = await prisma.task.create({
            data: body,
            include: { category: true }
        })

        return taskSchemas.parse(newTask)
    }

    getTasks = async (query?: string): Promise<Array<TTaksSchema>> => {

        const allTasks = await prisma.task.findMany({
            where: { category: { name: query } },
            include: { category: true }
        })

        return taskSchemas.array().parse(allTasks)
    }

    getOneTask = async (taskId: string): Promise<TTaksSchema> => {

        const task = await prisma.task.findFirst({
            where: { id: Number(taskId) },
            include: { category: true }
        })

        return taskSchemas.parse(task)
    }

    update = async (taskId: string, body: TTaskUpdateSchema): Promise<TTaksSchema> => {

        const updateTask = await prisma.task.update({ where: { id: Number(taskId) }, data: body })

        return taskSchemas.parse(updateTask)
    }

    delete = async (taskId: string): Promise<void> => {
        
        await prisma.task.delete({ where: { id: Number(taskId) } })
    }
}
