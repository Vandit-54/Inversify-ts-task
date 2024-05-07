import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { BookService } from '../services/BookService';

@controller('/books')
export class BookController {
    constructor(@inject(BookService) private bookService: BookService) {}

    @httpPost('/')
    async createBook(req: Request, res: Response): Promise<Response> {
        try {
            const book = await this.bookService.createBook(req.body);
            return res.status(201).json(book);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/:id')
    async getBookById(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.id;
            const book = await this.bookService.getBookById(bookId);
            return res.status(200).json(book);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/:id')
    async updateBook(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.id;
            const updatedBook = await this.bookService.updateBook(bookId, req.body);
            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/:id')
    async deleteBook(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = req.params.id;
            await this.bookService.deleteBook(bookId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
