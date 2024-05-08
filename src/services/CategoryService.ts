import { injectable } from 'inversify';
import { Category } from '../models/categoryModels';
import { ApiError } from '../utils';
import { HttpStatusCode } from '../enum';

@injectable()
export class CategoryService {
    async createCategory(categoryData: any): Promise<any> {
        try {
            const category = await Category.create(categoryData);
            return category;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,"Failed to create category");
        }
    }

    async getAllCategories(page: number, limit: number): Promise<any> {
        try {
            const skip = (page - 1) * limit;
            const categories = await Category.find().skip(skip).limit(limit);
            return categories;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,"Failed to get all categories");
        }
    }

    async getCategoryByName(categoryName: string): Promise<any> {
        try {
            const category = await Category.findOne({ name: categoryName });
            return category;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,"Failed to get category by name");
        }
    }

    async updateCategory(categoryName: string, updatedData: any): Promise<any> {
        try {
            const category = await Category.findOneAndUpdate({categoryName}, updatedData, {new: true});

            if (!category) {
                throw new ApiError(HttpStatusCode.NOT_FOUND,"Category not found");
            }

            return category;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,`Failed to update category - ${error.message}`)
        }
    }


    async deleteCategory(name: string): Promise<any> {
        try {
            const category = await Category.findOneAndDelete({name}); 
            if (!category) {
                throw new ApiError(HttpStatusCode.NOT_FOUND,"Category not found");
            }
            return category;
        } catch (error) {
            throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,`Failed to delete category - ${error.message}`)
        }
    }
    
}
