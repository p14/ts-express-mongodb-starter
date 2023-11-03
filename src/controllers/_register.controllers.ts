import { Application } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import authController from './auth.controller';
import todoListController from './todo_list.controller';
import accountController from './account.controller';

// Connect controller to the application
// Set the path to the controller, apply middleware (if needed), and apply controller
const registerControllers = (app: Application) => {
    app.use('/auth', authController);
    app.use('/account', authMiddleware, accountController);
    app.use('/todo-lists', authMiddleware, todoListController);
};

export default registerControllers;
