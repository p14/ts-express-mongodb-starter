import { Request, Response, Router } from 'express';
import TodoListService from '../services/todo.service';

const todoListService = new TodoListService();
const todoListController = Router();

todoListController.get('/', async (req: Request, res: Response) => {
    try {
        const response = await todoListService.getTodoLists();
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

todoListController.post('/', async (req: Request, res: Response) => {
    try {
        const response = await todoListService.createTodoList(req.body);
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

todoListController.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await todoListService.getTodoList(id);
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

todoListController.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await todoListService.updateTodoList(id, req.body);
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

todoListController.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await todoListService.deleteTodoList(id);
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

export default todoListController;
