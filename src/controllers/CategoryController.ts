import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { CategoryService } from '../services';
import { AuthMiddleware } from '../middlewares';
import { ApiResponse } from '../utils';
import { HttpStatusCode } from '../enum';
import { TYPES } from '../constants';

@controller('/category', AuthMiddleware)
export class CategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: CategoryService) { }

    @httpPost('/create')
    async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const category = await this.categoryService.createCategory(req.body);
            return res.status(HttpStatusCode.CREATED).json(
                new ApiResponse(HttpStatusCode.CREATED, category, "Category registered successfully")
            )
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpGet('/')
    async getCategories(req: Request, res: Response): Promise<Response> {
        try {
            const { name, page = 1, limit = 10 } = req.query;
            const categories = await this.categoryService.getAllCategories(name as string, parseInt(page as string), parseInt(limit as string));
            if (!categories || categories.length === 0) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/update/:id')
    async updateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const categoryId = req.params.id;
            const updatedCategory = await this.categoryService.updateCategory(categoryId, req.body);
            return res.status(200).json(updatedCategory);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    @httpDelete('/delete/:id')
    async deleteCategory(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const category = await this.categoryService.deleteCategory(id);
            if (category != null) {
                return res.status(200).json({ message: "Category deleted successfully" });
            }
            return res.status(404).json({ message: "Category not found" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}
