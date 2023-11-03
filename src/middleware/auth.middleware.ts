import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import modelRegistry from '../models/_register.models';
import { User } from '../models/user.model';
import cache from '../utils/cache';


const getUserData = async (userId: Types.ObjectId): Promise<User | null> => {
    // Check cache for user
    const cachedUser: User | undefined = cache.get(`user_${userId}`);

    if (cachedUser) {
        return cachedUser;
    }

    // Get the user model from the model registry
    const userModel: Model<User> = modelRegistry.get('users');
    const user = await userModel.findOne({ _id: userId });
    
    if (!user) {
        return null;
    }

    const parsedUser = user.toJSON();
    cache.set(`user_${userId}`, parsedUser);

    return parsedUser;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Grab the authorization header
    const authHeader = req.headers.authorization;

    // Grab the token from the bearer token if the authorization header is not empty
    const token = authHeader && authHeader.split(' ').pop();

    // Auth fails if there is no token found
    if (!token) {
        return res.sendStatus(401);
    }

    // Verify JWT token with secret and set the session user in the request body
    // Note: In endpoints that use authMiddleware, the 'sessionUser' property in the request body will be overwritten
    jwt.verify(token, String(process.env.JWT_SECRET), async (error: any, decodedToken: any) => {
        try {
            if (error || !decodedToken) {
                throw new Error('Invalid token')
            }

            const user = await getUserData(decodedToken.userId);

            if (!user) {
                throw new Error('User not found');
            }

            req.body.sessionUser = user;
            next();
        } catch (e: any) {
            console.error(e.message);
            return res.sendStatus(403);
        }
    });
}
