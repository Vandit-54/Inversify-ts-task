import { injectable } from 'inversify';
import { Category } from '../models/categoryModels';

@injectable()
export class CategoryService {
    async createCategory(categoryData: any): Promise<any> {
        try {
            const category = await Category.create(categoryData);
            return category;
        } catch (error) {
            throw new Error('Failed to create category');
        }
    }

    async getAllCategories(page: number, limit: number): Promise<any> {
        try {
            const skip = (page - 1) * limit;
            const categories = await Category.find().skip(skip).limit(limit);
            return categories;
        } catch (error) {
            throw new Error('Failed to get all categories');
        }
    }

    async getCategoryByName(categoryName: string): Promise<any> {
        try {
            const category = await Category.findOne({ name: categoryName });
            return category;
        } catch (error) {
            throw new Error('Failed to get category by name');
        }
    }

    async updateCategory(categoryName: string, updatedData: any): Promise<any> {
        try {
            const filter = { name: categoryName }; 
            const options = { new: true }; 

            const category = await Category.findOneAndUpdate(filter, updatedData, options);

            if (!category) {
                throw new Error('Category not found');
            }

            return category;
        } catch (error) {
            throw new Error('Failed to update category: ' + error.message);
        }
    }


    async deleteCategory(name: string): Promise<any> {
        try {
            const filter = { name: name };
            const category = await Category.findOneAndDelete(filter); 
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (error) {
            throw new Error('Failed to delete category: ' + error.message);
        }
    }
    
}
