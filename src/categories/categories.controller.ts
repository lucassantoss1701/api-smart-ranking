import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDTO : CreateCategoryDTO): Promise<Category>{
        return await this.categoriesService.createCategory(createCategoryDTO)
    }

    @Get()
    async searchCategories() : Promise<Category[]>{
        return await this.categoriesService.searchCategories();
    }

    @Get("/:category")
    async searchCategoryById(@Param("category") category: string) : Promise<Category>{
        return await this.categoriesService.searchCategoryById(category)
    }
}
