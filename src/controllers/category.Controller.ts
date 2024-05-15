import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { CategoryService } from '../services';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';
import { ApiResponse, ApiError } from '../utils';
import { HttpStatusCode } from '../enum';
import { TYPES } from '../constants';
import mongoose from 'mongoose';

@controller('/category', AuthMiddleware, RoleMiddleware)
export class CategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: CategoryService) { }

    @httpPost('/create')
    async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const categoryName = req.body.name
            const category = await this.categoryService.createCategory(categoryName);
            if (!category) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Something went wring while creating the category!" })
            }
            return res.status(HttpStatusCode.CREATED).json(
                new ApiResponse(HttpStatusCode.CREATED, category, "Category registered successfully")
            )
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpGet('/')
    async getCategories(req: Request, res: Response): Promise<Response> {
        try {
            const { name, page = 1, limit = 10 } = req.query;
            const categories = await this.categoryService.getAllCategories(name as string, parseInt(page as string), parseInt(limit as string));
            if (!categories || categories.length === 0) {
                return res.status(HttpStatusCode.NOT_FOUND).json(
                    new ApiResponse(HttpStatusCode.NOT_FOUND, "", "Category does not exists!")
                );
            }
            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, categories)
            );
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpPut('/update')
    async updateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const categoryId = req.query.id as string;
            if (!categoryId) {
                throw new ApiError(HttpStatusCode.BAD_REQUEST, "Category ID is required");
            }
            const objectId = new mongoose.Types.ObjectId(categoryId);

            const {name} = req.body;
            const updatedCategory = await this.categoryService.updateCategory(objectId, name);
            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, updatedCategory)
            );
        } catch (error) {
            if (error.name === "BSONError") {
                return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Invalid ObjectId format" });
            } else if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }


    @httpDelete('/delete')
    async deleteCategory(req: Request, res: Response): Promise<Response> {
        try {
            const categoryId = req.query.id as string;
            const objectId = new mongoose.Types.ObjectId(categoryId);
            const category = await this.categoryService.deleteCategory(objectId);
            if (category != null) {
                return res.status(HttpStatusCode.OK).json(
                    { message: "Category deleted successfully" }
                );
            }
            return res.status(404).json({ message: "Category not found" });
        } catch (error) {
            if (error.name === "BSONError") {
                return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Invalid ObjectId format" });
            } else if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

}
