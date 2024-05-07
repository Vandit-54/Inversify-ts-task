import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { CategoryService } from '../services/CategoryService';

@controller('/categories')
export class CategoryController {
    constructor(@inject(CategoryService) private categoryService: CategoryService) {}

    @httpPost('/')
    async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const category = await this.categoryService.createCategory(req.body);
            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/:id')
    async getCategoryById(req: Request, res: Response): Promise<Response> {
        try {
            const categoryId = req.params.id;
            const category = await this.categoryService.getCategoryById(categoryId);
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/:id')
    async updateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const categoryId = req.params.id;
            const updatedCategory = await this.categoryService.updateCategory(categoryId, req.body);
            return res.status(200).json(updatedCategory);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/:id')
    async deleteCategory(req: Request, res: Response): Promise<Response> {
        try {
            const categoryId = req.params.id;
            await this.categoryService.deleteCategory(categoryId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
