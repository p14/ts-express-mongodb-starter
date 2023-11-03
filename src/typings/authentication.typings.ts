import { Types } from 'mongoose';

export interface AuthenticatedUserResponse {
    authenticationResult: {
        accessToken: string;
        refreshToken: string | undefined;
    };
    user: { userId: Types.ObjectId }
}