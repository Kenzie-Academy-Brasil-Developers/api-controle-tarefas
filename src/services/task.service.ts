import { prisma } from "../database/prisma"
import { TTaksSchema, TTaskCreateSchema, TTaskReturnCategory, TTaskUpdateSchema } from "../interface/task.interface"
import { categoryReturnSchemas, taskSchemas } from "../schemas/task.schemas"

export class TaskServices {

    create = async (body: TTaskCreateSchema, userId: number): Promise<TTaksSchema> => {
        
        const newTask = { ...body, userId }

        const data = await prisma.task.create({
            data: newTask,
            include: { category: true }
        })

        return taskSchemas.parse(data)
    }

    getTasks = async (userId: number, category?: string): Promise<Array<TTaskReturnCategory>> => {

        let prismaQuery: any = {
            include: { category: true },
            where: { userId },
        }

        if (category) {

            const whereClause = { name: { equals: category, mode: "insensitive" } }

            prismaQuery = {
                ...prismaQuery,
                where: { ...prismaQuery.where, category: whereClause },
            }
        }

        const allTasks = await prisma.task.findMany(prismaQuery)

        return categoryReturnSchemas.array().parse(allTasks)
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
