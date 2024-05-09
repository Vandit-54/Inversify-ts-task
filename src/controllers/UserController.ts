import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { UserService } from '../services';
import { AuthMiddleware } from '../middlewares';
import bcrypt from 'bcryptjs';
import { HttpStatusCode } from '../enum';
import { ApiResponse } from '../utils';
import { TYPES } from '../constants';
@controller('/user')
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) { }

    @httpPost('/register')
    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(HttpStatusCode.CREATED).json(
                new ApiResponse(HttpStatusCode.OK, user, "User registered Successfully")
            );
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpGet('/login')
    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const user = await this.userService.login(email);
            if (!user) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ message: "User not found" });
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (comparePassword) {
                const token = user.accessToken();
                if (token) {
                    return res.status(HttpStatusCode.OK).json(
                        new ApiResponse(HttpStatusCode.ACCEPTED, { loggedInUser: user, token: token }, "User logged in succesfully")
                    )
                } else {
                    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Something went wrong" });
                }
            } else {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid password" });
            }

        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpPut('/update', AuthMiddleware)
    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user.id;
            const updatedUser = await this.userService.updateUser(userId, req.body);
            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, { updatedUser: updatedUser}, "User updated succesfully")
            )
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpDelete('/delete', AuthMiddleware)
    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user.id;
            const status = await this.userService.deleteUser(userId);
            if (!status) {
                return res.status(HttpStatusCode.OK).json(
                    new ApiResponse(HttpStatusCode.OK, null, "User Deleted succesfully")
                )
            } 
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}
