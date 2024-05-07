// bookController.ts
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { BookService } from '../services/BookService';
import { tokenVerificationMiddleware } from '../middelwares/auth.middelwear';

@controller('/books',tokenVerificationMiddleware)
export class BookController {
    constructor(@inject(BookService) private bookService: BookService) {}

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
            const { page = 1, limit = 10 } = req.query;
            const books = await this.bookService.getAllBooks(parseInt(page as string), parseInt(limit as string));
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/:name')
    async getBookById(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.name;
            const book = await this.bookService.getBookById(bookId);
            return res.status(200).json(book);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/update/:name')
    async updateBook(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.name;
            const updatedBook = await this.bookService.updateBook(bookId, req.body);
            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/delete/:name')
    async deleteBook(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.name;
            await this.bookService.deleteBook(bookId);
            return res.status(200).json({message:"Book deleted successfully"});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
