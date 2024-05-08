// authorControler.ts
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { AuthorService } from '../services/AuthorService';
import bcrypt from 'bcryptjs';
import { tokenVerificationMiddleware } from '../middelwares/auth.middelwear';

@controller('/author',tokenVerificationMiddleware)
export class AuthorController {
    constructor(@inject(AuthorService) private authorService: AuthorService) {}

    @httpPost('/register')
    async createAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const author = await this.authorService.createAuthor(req.body);
            return res.status(201).json(author);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/login')
    async getAuthorById(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const author = await this.authorService.login(email);
            if (!author) {
                res.status(404).json({ message: "Author not found" });
            }
            const comparePassword = bcrypt.compareSync(password, author.password);
            if (comparePassword) {
                const token = author.accessToken();
                if (token) {
                    return res.status(200).json({ data: author, token: token });
                } else {
                    return res.status(400).json({ message: "Something went wrong" });
                }
            } else {
                return res.status(400).json({ message: "Invalid password" });
            }

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/update')
    async updateAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const authorId = req.body._id;
            const updatedAuthor = await this.authorService.updateAuthor(authorId, req.body);
            return res.status(200).json(updatedAuthor);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/delete')
    async deleteAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const authorId = req.body._id;
            const status = await this.authorService.deleteAuthor(authorId);
            if (status != null) {
                return res.status(200).json({ message: "Author deleted successfully" });
            } else {
                return res.status(404).json({ message: "Author does not exist" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
