import { Request, Response, Router } from 'express';
import AccountService from '../services/account.service';

const accountService = new AccountService();
const accountController = Router();

accountController.patch('/name', async (req: Request, res: Response) => {
    try {
        const { sessionUser, firstName, lastName } = req.body;
        const response = await accountService.updateName(sessionUser._id, { firstName, lastName });
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

accountController.patch('/password', async (req: Request, res: Response) => {
    try {
        const { sessionUser, oldPassword, newPassword } = req.body;
        await accountService.updatePassword(sessionUser._id, oldPassword, newPassword);
        res.sendStatus(204);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

accountController.delete('/', async (req: Request, res: Response) => {
    try {
        const { sessionUser } = req.body;
        await accountService.deleteUser(sessionUser._id);
        res.sendStatus(204);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

export default accountController;
