import TodoFields from '../enums/TodoFields';

export type TodoItem = {
 [key in TodoFields]: string;
}
