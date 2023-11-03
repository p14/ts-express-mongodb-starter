import ModelsContainer from './_models.container';
import { User, userSchema } from './user.model';
import { TodoList, todoListSchema } from './todo_list.model';

// Instantiate models dependencies
const modelRegistry = new ModelsContainer();

// Register models
modelRegistry.register<TodoList>('todo_lists', todoListSchema);
modelRegistry.register<User>('users', userSchema);

export default modelRegistry;