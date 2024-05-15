// authorControler.ts
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete, TYPE } from 'inversify-express-utils';
import { AuthorService } from '../services';
import bcrypt from 'bcryptjs';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';
import { TYPES } from '../constants';
import { ApiError, ApiResponse } from '../utils';
import { HttpStatusCode } from '../enum';
import { IAuthor } from '../interfaces';
import mongoose from 'mongoose';

@controller('/author', AuthMiddleware)
export class AuthorController {
    constructor(@inject(TYPES.AuthorService) private authorService: AuthorService) { }

    @httpPost('/register', RoleMiddleware)
    async createAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password, biography, nationality } = req.body
            const authorData = { name, email, password, biography, nationality };
            const author = await this.authorService.createAuthor(authorData);
            if (!author) {
                throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Something went wrong while creating author")
            }
            return res.status(HttpStatusCode.CREATED).json(
                new ApiResponse(HttpStatusCode.OK, author, "Author registerd successfully")
            );
        } catch (error) {
            if (error.code === 11000) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "User alredy exists" });
            }
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpGet('/login')
    async getAuthorById(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const author = await this.authorService.login(email);

            if (!author) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ message: "Author not found" });
            }
            const comparePassword = bcrypt.compareSync(password, author.password);

            if (!comparePassword) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid password" });
            }

            const token = author.accessToken();

            if (!token) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Something went wrong" });
            }

            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.ACCEPTED, { loggedInAuthor: author, token: token }, "Author logged in successfully")
            );

        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpPut('/update')
    async updateAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const authorId = req.query.id as string;

            if (!authorId) {
                throw new ApiError(HttpStatusCode.BAD_REQUEST, "Author ID is required");
            }
            const objectId = new mongoose.Types.ObjectId(authorId);

            const { name, email, password, biography, nationality } = req.body;

            const userData: IAuthor = { name, email, password, biography, nationality };

            const updatedUser = await this.authorService.updateAuthor(objectId, userData);

            if (!updatedUser) {
                throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Something went wrong while updating author")
            }

            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, { updatedUser: updatedUser }, "author updated succesfully")
            )
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }


    @httpDelete('/delete', RoleMiddleware)
    async deleteAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const authorId = req.query.id as string;

            if (!authorId) {
                throw new ApiError(HttpStatusCode.BAD_REQUEST, "Author ID is required");
            }
            const objectId = new mongoose.Types.ObjectId(authorId);
            
            const status = await this.authorService.deleteAuthor(objectId);
            if (!status) {
                throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Something went wrong while deleting author")
            }
            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, '', "Author Deleted succesfully")
            )
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}
