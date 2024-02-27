import { prisma } from "../database/prisma";
import { TCategoryCreateSchema, TCategorySchema } from "../interface/category.interface";
import { categorySchemas } from "../schemas/category.schemas";


export class CategoryServices{
    
    create = async ({...body}: TCategoryCreateSchema, userId: number): Promise<TCategorySchema> => {
        const newCategory = {...body, userId}

        const data = await prisma.category.create({data: newCategory})

        return categorySchemas.parse(data)
    }

    delete = async (idCategory: string): Promise<void> => {
        
        await prisma.category.delete({ where: { id: Number(idCategory) } })
    }
}