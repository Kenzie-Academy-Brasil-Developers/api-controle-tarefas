import { prisma } from "../database/prisma";
import { TCategoryCreateSchema, TCategorySchema } from "../interface/category.interface";
import { categorySchemas } from "../schemas/category.schemas";


export class CategoryServices{
    
    create = async ({...body}: TCategoryCreateSchema): Promise<TCategorySchema> => {

        const newCategory = await prisma.category.create({data: {...body}})
        return categorySchemas.parse(newCategory)
    }

    delete = async (idCategory: string): Promise<void> => {
        
        await prisma.category.delete({ where: { id: Number(idCategory) } })
    }
}