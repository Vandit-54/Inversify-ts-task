import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { ApiResponse } from '../utils';
import { HttpStatusCode } from '../enum';

export class RoleMiddleware extends BaseMiddleware {

    async handler(req: Request , res:Response , next: NextFunction) {
        const  role  = req.user.role;
        if (role !== "admin") {
            return res.status(HttpStatusCode.FORBIDDEN).json(
                new ApiResponse(HttpStatusCode.FORBIDDEN, null, "Access denied. Insufficient privileges.")
            );
        }
        next();
    }

}
