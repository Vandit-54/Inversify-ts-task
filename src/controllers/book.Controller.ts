// bookController.ts
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { BookService } from '../services';
import { AuthMiddleware } from '../middlewares';
import { TYPES } from '../constants';

@controller('/books', AuthMiddleware)
export class BookController {
    constructor(@inject(TYPES.BookService) private bookService: BookService) { }

    @httpPost('/create')
    async createBook(req: Request, res: Response): Promise<Response> {
        try {
            const book = await this.bookService.createBook(req.body);
            return res.status(201).json(book);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/all')
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
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ message: error.message });
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
