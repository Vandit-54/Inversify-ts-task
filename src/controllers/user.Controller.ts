import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { UserService } from '../services';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';
import bcrypt from 'bcryptjs';
import { HttpStatusCode } from '../enum';
import { ApiError, ApiResponse } from '../utils';
import { TYPES } from '../constants';
import { IUser } from '../interfaces';

@controller('/user')
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) { }

    @httpPost('/register')
    async createUser(req: Request, res: Response): Promise<Response> {
        try {

            const {name,username,email,password,phonenumber,role} = req.body;

            if (
                [name,username,email,password,phonenumber,role].some((field) => field?.trim() === "")
            ) {
                throw new ApiError(HttpStatusCode.BAD_REQUEST, "All fields are required")
            }

            const userData:IUser = {name,username,email,password,phonenumber,role}
           
            const user = await this.userService.createUser(userData);

            if (!user) {
                throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,"Something went wrong while creating user")
            }
            
            return res.status(HttpStatusCode.CREATED).json(
                new ApiResponse(HttpStatusCode.OK, user, "User registered Successfully")
            );
        } catch (error) {
            if (error.code === 11000) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message:"User alredy exists" });
            }
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

            if (!comparePassword) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid password" });
            }

            const token = user.accessToken();

            if (!token) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Something went wrong" });
            }

            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.ACCEPTED, { loggedInUser: user, token: token }, "User logged in successfully")
            );

        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @httpPut('/update', AuthMiddleware)
    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user.id;
            
            const {name,username,email,password,phonenumber} = req.body;

            const userData:IUser = {name,username,email,password,phonenumber}

            const updatedUser = await this.userService.updateUser(userId, userData);

            if (!updatedUser) {
                throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,"Something went wrong while updating user")
            }

            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, { updatedUser: updatedUser }, "User updated succesfully")
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
                throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR,"Something went wrong while deleting user")
            }
            return res.status(HttpStatusCode.OK).json(
                new ApiResponse(HttpStatusCode.OK, '',"User Deleted succesfully")
            )
        } catch (error) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}
