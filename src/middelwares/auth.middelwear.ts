import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/userModels';
import { BaseMiddleware } from 'inversify-express-utils';

// diffrent file
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; 
        }
    }
}

export class authMiddelwear extends BaseMiddleware{

 async handler(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN) as JwtPayload;
        if (!decoded) {
            return res.status(401).json({message:"Token verification failed"})
        }
       
        const userId = decoded.id;
        const user = await User.findOne({ _id: userId });
      
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
}
