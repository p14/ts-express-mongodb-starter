import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import modelRegistry from '../models/_register.models';
import { TodoList } from '../models/todo_list.model';

export default class TodoListService {
    private todoListModel: Model<TodoList>;

    constructor() {
        this.todoListModel = modelRegistry.get('todo_lists');
    }

    public async getTodoLists(): Promise<TodoList[]> {
        return this.todoListModel.find();
    };
    
    public async createTodoList(todoList: TodoList): Promise<TodoList> {
        return this.todoListModel.create(todoList);
    };
    
    public async getTodoList(id: string): Promise<TodoList> {
        const todoList = await this.todoListModel.findOne({ _id: id });
        if (!todoList) {
            throw new Error('Todo list not found');
        }

        return todoList;
    };
    
    public async updateTodoList(id: string, todoList: TodoList): Promise<TodoList> {
        const updatedTodoList = await this.todoListModel.findOneAndUpdate({ _id: id }, todoList, { new: true });
        if (!updatedTodoList) {
            throw new Error('Todo list not found');
        }

        return updatedTodoList;
    };
    
    public async deleteTodoList(id: string): Promise<DeleteResult> {
        return this.todoListModel.deleteOne({ _id: id });
    };
}
