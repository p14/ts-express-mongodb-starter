import { Request, Response, Router } from 'express';
import AuthService from '../services/auth.service';

const authService = new AuthService();
const authController = Router();

authController.post('/register', async (req: Request, res: Response) => {
    try {
        const response = await authService.registerUser(req.body);
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

authController.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const response = await authService.loginUser(username, password);
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

authController.get('/refresh', async (req: Request, res: Response) => {
    try {
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken || Array.isArray(refreshToken)) {
            throw new Error('No Refresh Token');
        }

        const response = await authService.refreshToken(refreshToken);
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

export default authController;
