import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    return bcrypt.hash(password, salt);
};

export const validatePassword = async (password: string, hashedPassword: string): Promise<void> => {
    const validated = await bcrypt.compare(password, hashedPassword);
    if (!validated) {
        throw new Error('Invalid password');
    }
}
