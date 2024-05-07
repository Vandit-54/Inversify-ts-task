import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; 
        }
    }
}


export const tokenVerificationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
