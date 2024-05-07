import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { UserService } from '../services/UserService';
import { tokenVerificationMiddleware } from '../middelwares/auth.middelwear';

@controller('/user')
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {}

    @httpPost('/register')
    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet('/:id',tokenVerificationMiddleware)
    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const user = await this.userService.login(userId);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPut('/update',tokenVerificationMiddleware)
    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const updatedUser = await this.userService.updateUser(userId, req.body);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/delete',tokenVerificationMiddleware)
    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            await this.userService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
