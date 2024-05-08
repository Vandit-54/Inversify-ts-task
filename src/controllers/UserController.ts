import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { UserService } from '../services';
import { AuthMiddelwear } from '../middelwares';
import bcrypt from 'bcryptjs';
import { HttpStatusCode } from '../enum';
import { ApiResponse } from '../utils';
@controller('/user')
export class UserController {
    constructor(@inject(UserService) private userService: UserService) { }

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

    @httpPut('/update', AuthMiddelwear)
    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.body._id;
            const updatedUser = await this.userService.updateUser(userId, req.body);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete('/delete', AuthMiddelwear)
    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.body._id;
            const status = await this.userService.deleteUser(userId);
            if (status != null) {
                return res.status(200).json({ message: "User deleted successfully" });
            } else {
                return res.status(404).json({ message: "User does not exist" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
