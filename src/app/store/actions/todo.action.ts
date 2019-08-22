import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ToDo } from '../../models';

export enum TodoActionTypes
{
  GetTodos = '[Todo] get todos',
  GetTodosSuccess = '[Todo API] Todos Loaded',
  AddTodo = '[Todo] Add Todo',
  AddTodoSuccess = '[Todo API] Todo Added',
  EditTodo = '[Todo] Edit Todo',
  EditTodoSuccess = '[Todo API] Todo Edited',
  ToggleTodo = '[Todo] Toggle Todo',
  ToggleTodoSuccess = '[Todo API] Todo Toggled',
  DeleteTodo = '[Todo] Delete Todo',
  DeleteTodoSuccess = '[Todo API] Todo Deleted',
}

export class GetTodos implements Action
{
  readonly type = TodoActionTypes.GetTodos;
}

export class GetTodosSuccess implements Action
{
  readonly type = TodoActionTypes.GetTodosSuccess;

  constructor(public payload: { todos: ToDo[] }) { }
}

export class AddTodo implements Action
{
  readonly type = TodoActionTypes.AddTodo;

  constructor(public payload: { text: string, userId: string }) { }
}

export class AddTodoSuccess implements Action
{
  readonly type = TodoActionTypes.AddTodoSuccess;

  constructor(public payload: { todo: ToDo }) { }
}

export class EditTodo implements Action
{
  readonly type = TodoActionTypes.EditTodo;

  constructor(public payload: { id: string, text: string }) { }
}

export class EditTodoSuccess implements Action
{
  readonly type = TodoActionTypes.EditTodoSuccess;

  constructor(public payload: { todo: Update<ToDo> }) { }
}

export class ToggleTodo implements Action
{
  readonly type = TodoActionTypes.ToggleTodo;

  constructor(public payload: { id: string }) { }
}

export class ToggleTodoSuccess implements Action
{
  readonly type = TodoActionTypes.ToggleTodoSuccess;

  constructor(public payload: { id: string }) { }
}

export class DeleteTodo implements Action
{
  readonly type = TodoActionTypes.DeleteTodo;

  constructor(public payload: { id: string }) { }
}

export class DeleteTodoSuccess implements Action
{
  readonly type = TodoActionTypes.DeleteTodoSuccess;

  constructor(public payload: { id: string }) { }
}

export type TodoActions = GetTodos
  | GetTodosSuccess
  | AddTodo
  | AddTodoSuccess
  | EditTodo
  | EditTodoSuccess
  | ToggleTodo
  | ToggleTodoSuccess
  | DeleteTodo
  | DeleteTodoSuccess;
