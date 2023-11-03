import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Document, Model, Types } from 'mongoose';
import { User } from '../models/user.model';
import modelRegistry from '../models/_register.models';
import { AuthenticatedUserResponse } from '../typings/authentication.typings';
import { hashPassword, validatePassword } from '../utils/helpers';
import cache from '../utils/cache';

dotenv.config();

export default class AuthService {
    private userModel: Model<User>;

    constructor() {
        this.userModel = modelRegistry.get('users');
    }
    
    private getSignedTokens(userId: Types.ObjectId, includeRefresh: boolean = false): AuthenticatedUserResponse {
        const payload = { userId };
        const token = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 }); // 1 hour
        let refresh: string | undefined;
    
        if (includeRefresh) {
            refresh = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * 7 }); // 1 week
        }
    
        const authenticationResult = {
            accessToken: token,
            refreshToken: refresh,
        };
    
        return { authenticationResult, user: payload };
    };
    
    public async registerUser(newUser: User): Promise<User & Document> {
        const user = {
            ...newUser,
            username: newUser.username.toLowerCase(),
            password: await hashPassword(newUser.password),
        };
        return this.userModel.create(user);
    };
    
    public async loginUser(username: string, password: string): Promise<AuthenticatedUserResponse> {
        const user = await this.userModel.findOne({ username: username.toLowerCase() });
        if (!user) {
            throw new Error('User not found');
        }
    
        await validatePassword(password, user.password);
        cache.set(`user_${user._id}`, user.toJSON());

        return this.getSignedTokens(user._id, true);
    };
    
    public async refreshToken(refreshToken: string): Promise<AuthenticatedUserResponse> {
        const decodedToken = jwt.verify(refreshToken, String(process.env.JWT_SECRET)) as jwt.JwtPayload;
        const user = await this.userModel.findOne({ _id: decodedToken.userId });

        if (!user) {
            throw new Error('User not found');
        }

        return this.getSignedTokens(user._id);
    }
}
