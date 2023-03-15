import { TodoItem } from '../interfaces/TodoItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface TodoState {
  value: TodoItem[];
}

const initialState: TodoState = {
  value: []
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TodoItem>) => {
        state.value.push(action.payload)
      },
      prepare: (item) => ({ payload: { ...item, date: new Date().toISOString() } })
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(item => item.date !== action.payload)
    }
  }
});

export const { addTodo, removeTodo } = todoSlice.actions;

export const todosSelector = (state: RootState) => state.todos.value;

export default todoSlice.reducer;