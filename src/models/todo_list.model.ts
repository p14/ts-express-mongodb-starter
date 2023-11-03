import { Schema, Types } from 'mongoose';

export interface TodoList {
    title: string
    todoList: string[]
    userId: Types.ObjectId,
}

export const todoListSchema = new Schema<TodoList>({
    title: {
        type: String,
        required: true,
    },
    todoList: {
        type: [String],
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
});
