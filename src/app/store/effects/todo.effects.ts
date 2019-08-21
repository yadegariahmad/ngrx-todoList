import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import
{
  TodoActionTypes,
  GetTodos,
  GetTodosSuccess,
  AddTodo,
  EditTodod,
  DeleteTodo,
  ToggleTodo
} from '../actions';
import
{
  tap,
  map,
  mergeMap,
  filter,
  withLatestFrom
} from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { AppState } from '../reducers';
import { selectTodoState } from '../selectors';
import { TodoService } from '../../services';

@Injectable()
export class TodoEffects
{
  @Effect()
  getTodos$ = this.actions$.pipe(
    ofType<GetTodos>(TodoActionTypes.GetTodos),
    withLatestFrom(this.store.pipe(select(selectTodoState))),
    filter(([action, selectTodoState]) => !selectTodoState),
    mergeMap(() => this.todoService.getTodos()),
    map(todoResponse => new GetTodosSuccess({ todos: todoResponse.todos }))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private todoService: TodoService
  ) { }
}
