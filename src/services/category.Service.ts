import { injectable } from 'inversify';
import { Category } from '../models/category.Models';
import { ApiError } from '../utils';
import { HttpStatusCode } from '../enum';
import { ICategory, ICategoryService } from '../interfaces';

@injectable()
export class CategoryService implements ICategoryService {
    async createCategory(name: ICategory): Promise<ICategory> {

            const existedCategory = await Category.findOne({name})
            if (!existedCategory) {
                const category = await Category.create({name});
                return category;
            }
            throw new ApiError(HttpStatusCode.BAD_REQUEST, 'Category already exists');
            
    }

    async getAllCategories(name: string, page: number, limit: number): Promise<any> {
            const query: any = {};
            if (name) {
                query.name = { $regex: name, $options: 'i' }; 
            }
            const skip = (page - 1) * limit;
            const categories = await Category.find(query).skip(skip).limit(limit);
            return categories;
    }

    async updateCategory(categoryId: string, updatedData: ICategory): Promise<ICategory> {
            const category = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });
            if (!category) {
                throw new ApiError(HttpStatusCode.NOT_FOUND, "Category not found");
            }
            return category;
    }    

    async deleteCategory(id: string): Promise<any> {
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                throw new ApiError(HttpStatusCode.NOT_FOUND, "Category not found");
            }
            return category;
    }    
}
