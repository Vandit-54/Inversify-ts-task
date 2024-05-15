// bookController.ts
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { BookService } from '../services';
import { AuthMiddleware } from '../middlewares';
import { TYPES } from '../constants';
import { HttpStatusCode } from '../enum';
import { ApiError, ApiResponse } from '../utils';

@controller('/books', AuthMiddleware)
export class BookController {
    constructor(@inject(TYPES.BookService) private bookService: BookService) { }

    @httpPost('/create')
    async createBook(req: Request, res: Response): Promise<Response> {
        try {
            const { title, author, category, ISBN, description, price } = req.body;
            const bookData = { title, author, category, ISBN, description, price }
            const book = await this.bookService.createBook(bookData);
            if (!book) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Something went wring while creating the book!" })
            }
            return res.status(HttpStatusCode.CREATED).json(
                new ApiResponse(HttpStatusCode.CREATED, book, "book registered successfully")
            )
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpGet('/')
    async getAllBooks(req: Request, res: Response): Promise<Response> {
        try {
            const { page = 1, limit = 10, name, price, author, category } = req.query;
            const books = await this.bookService.getAllBooks(
                parseInt(page as string),
                parseInt(limit as string),
                name ? name as string : undefined,
                price ? parseInt(price as string) : undefined,
                author ? author as string : undefined,
                category ? category as string : undefined
            );

            if (!books || books.length === 0) {
                return res.status(HttpStatusCode.NOT_FOUND).json(
                    new ApiResponse(HttpStatusCode.NOT_FOUND, "", "Book does not exist!")
                );
            }
            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, books)
            );
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }


    @httpPut('/update/:id')
    async updateBook(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.id;
            const updatedBook = await this.bookService.updateBook(bookId, req.body);
            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/delete/:id')
    async deleteBook(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.id;
            await this.bookService.deleteBook(bookId);
            return res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}
