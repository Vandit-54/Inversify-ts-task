import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { AuthorService } from '../services/AuthorService';

@controller('/authors')
export class AuthorController {
    constructor(@inject(AuthorService) private authorService: AuthorService) {}

    @httpPost('/')
    async createAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const author = await this.authorService.createAuthor(req.body);
            return res.status(201).json(author);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/:id')
    async getAuthorById(req: Request, res: Response): Promise<Response> {
        try {
            const authorId = req.params.id;
            const author = await this.authorService.getAuthorById(authorId);
            return res.status(200).json(author);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/:id')
    async updateAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const authorId = req.params.id;
            const updatedAuthor = await this.authorService.updateAuthor(authorId, req.body);
            return res.status(200).json(updatedAuthor);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/:id')
    async deleteAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const authorId = req.params.id;
            await this.authorService.deleteAuthor(authorId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
