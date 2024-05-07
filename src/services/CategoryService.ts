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

    async getCategoryById(categoryId: string): Promise<any> {
        try {
            const category = await Category.findById(categoryId);
            return category;
        } catch (error) {
            throw new Error('Failed to get category by ID');
        }
    }

    async updateCategory(categoryId: string, updateData: any): Promise<any> {
        try {
            const category = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
            return category;
        } catch (error) {
            throw new Error('Failed to update category');
        }
    }

    async deleteCategory(categoryId: string): Promise<any> {
        try {
            await Category.findByIdAndDelete(categoryId);
            return { message: 'Category deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete category');
        }
    }
}
