import dotenv from 'dotenv';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import modelRegistry from '../models/_register.models';
import { User } from '../models/user.model';
import cache from '../utils/cache';
import { hashPassword, validatePassword } from '../utils/helpers';

dotenv.config();

export default class AccountService {
    private userModel: Model<User>;

    constructor() {
        this.userModel = modelRegistry.get('users');
    }
    
    public async updateName(userId: string, update: { firstName: string, lastName: string }): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate({ _id: userId }, update, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }

        cache.del(`user_${userId}`);
        return updatedUser;
    };

    public async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }
    
        await validatePassword(oldPassword, user.password);

        const update = { password: await hashPassword(newPassword) };
        
        await this.userModel.updateOne({ _id: userId }, { $set: update });
    };
    
    public async deleteUser(userId: string): Promise<DeleteResult> {
        const deleteResponse = await this.userModel.deleteOne({ _id: userId });
        cache.del(`user_${userId}`);
        return deleteResponse;
    };
}
