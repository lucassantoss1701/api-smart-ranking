import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>){}

    async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<Category>{
        const { category} = createCategoryDTO;

        const categoryExist =  await this.categoryModel.findOne({category}).exec();

        if(categoryExist){
            throw new BadRequestException(`Categoria ${category} já cadastrada!`)
        }

        const categoryCreated = new this.categoryModel(createCategoryDTO);
        return await categoryCreated.save();
    }


    async searchCategories() : Promise<Category[]>{
        return await this.categoryModel.find().exec();
    }

    async searchCategoryById(category: string) : Promise<Category>{
        const categoryExist = await this.categoryModel.findOne({category}).exec();
        
        if(!categoryExist){
            throw new NotFoundException(`Categoria ${category} não existe`);
        }

        return categoryExist;
    }
}
