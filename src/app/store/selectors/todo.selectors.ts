import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducer';

export const selectTodoState = createFeatureSelector<Array<TodoState>>('todo');

export const getTodoById = (id: string) => createSelector(
  selectTodoState,
  todos => todos.filter(todo => todo.id === id)[0],
);

export const getTodoText = (todoId: string) => createSelector(
  getTodoById(todoId),
  todo => todo.text
);
