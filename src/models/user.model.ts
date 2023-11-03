import { Schema } from 'mongoose';

export interface User {
    firstName: string
    lastName: string
    username: string
    password: string
}

export const userSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

userSchema.methods.toJSON = function toJSONMethod() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
