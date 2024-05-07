import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { CategoryService } from '../services/CategoryService';
import { tokenVerificationMiddleware } from '../middelwares/auth.middelwear';

@controller('/category',tokenVerificationMiddleware)
export class CategoryController {
    constructor(@inject(CategoryService) private categoryService: CategoryService) {}

    @httpPost('/create')
    async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const category = await this.categoryService.createCategory(req.body);
            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/all') 
    async getAllCategories(req: Request, res: Response): Promise<Response> {
        try {
                const { page = 1, limit = 10 } = req.query;
                const categories = await this.categoryService.getAllCategories(parseInt(page as string), parseInt(limit as string));
                return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/:name')
    async getCategoryByName(req: Request, res: Response): Promise<Response> {
        try {
            const categoryName = req.params.name;
            const category = await this.categoryService.getCategoryByName(categoryName);
            if (category != null) {
                return res.status(200).json(category);
            }
            return res.status(404).json({ message: "Category Not found"});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/update/:name')
    async updateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const categoryName = req.params.name;
            const updatedCategory = await this.categoryService.updateCategory(categoryName, req.body);
            return res.status(200).json(updatedCategory);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/delete/:name')
    async deleteCategory(req: Request, res: Response): Promise<Response> {
        try {
            const name = req.params.name;
            const category = await this.categoryService.deleteCategory(name);
            if (category != null) {
                return res.status(200).json({message:"category deleted succesfully"});
            }
                return res.status(404).json({ message: "Category Not found"});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
