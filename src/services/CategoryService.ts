import { injectable } from 'inversify';
import { Category } from '../models/categoryModels';
import { ApiError } from '../utils';
import { HttpStatusCode } from '../enum';
import { ICategory, ICategoryService } from '../interfaces';

@injectable()
export class CategoryService implements ICategoryService {
    async createCategory(categoryData: ICategory): Promise<ICategory> {
        try {
            const category = await Category.create(categoryData);
            return category;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to create category");
        }
    }

    async getAllCategories(name: string, page: number, limit: number): Promise<any> {
        try {
            const query: any = {};
            if (name) {
                query.name = { $regex: name, $options: 'i' }; 
            }
            const skip = (page - 1) * limit;
            const categories = await Category.find(query).skip(skip).limit(limit);
            return categories;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to get categories");
        }
    }

    async updateCategory(categoryId: string, updatedData: ICategory): Promise<ICategory> {
        try {
            const category = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });
    
            if (!category) {
                throw new ApiError(HttpStatusCode.NOT_FOUND, "Category not found");
            }
    
            return category;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, `Failed to update category - ${error.message}`)
        }
    }    

    async deleteCategory(id: string): Promise<any> {
        try {
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                throw new ApiError(HttpStatusCode.NOT_FOUND, "Category not found");
            }
            return category;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, `Failed to delete category - ${error.message}`)
        }
    }    

}
