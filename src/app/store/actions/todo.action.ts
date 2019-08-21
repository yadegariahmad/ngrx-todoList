import { Action } from '@ngrx/store';
import { ToDo } from '../../models';

export enum TodoActionTypes
{
  GetTodos = '[Todo] get todos',
  GetTodosSuccess = '[Todo API] todos Loaded',
  AddTodo = '[Todo] Add Todo',
  EditTodo = '[Todo] Edit Todo',
  ToggleTodo = '[Todo] Toggle Todo',
  DeleteTodo = '[Todo] Delete Todo',
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

  constructor(public payload: { text: string }) { }
}

export class EditTodod implements Action
{
  readonly type = TodoActionTypes.EditTodo;

  constructor(public payload: { id: number, text: string }) { }
}

export class ToggleTodo implements Action
{
  readonly type = TodoActionTypes.ToggleTodo;

  constructor(public payload: { id: string }) { }
}

export class DeleteTodo implements Action
{
  readonly type = TodoActionTypes.DeleteTodo;

  constructor(public payload: { id: string }) { }
}

export type TodoActions = GetTodos | GetTodosSuccess | AddTodo | EditTodod | ToggleTodo | DeleteTodo;
