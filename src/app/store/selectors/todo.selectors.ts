import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState, selectAll } from '../reducers/todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const getTodos = createSelector(
  selectTodoState,
  selectAll
);

export const getTodoById = (id: string) => createSelector(
  getTodos,
  todos => todos.filter(todo => todo._id === id)[0],
);

export const getTodoText = (todoId: string) => createSelector(
  getTodoById(todoId),
  todo => todo.text
);
