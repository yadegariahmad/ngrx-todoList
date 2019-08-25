import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import
{
  TodoActionTypes,
  GetTodos,
  GetTodosSuccess,
  AddTodo,
  AddTodoSuccess,
  EditTodo,
  EditTodoSuccess,
  DeleteTodo,
  DeleteTodoSuccess,
  ToggleTodo,
  ToggleTodoSuccess
} from '../actions';
import
{
  map,
  mergeMap,
  filter,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { AppState } from '../reducers';
import { getTodos } from '../selectors';
import { TodoService } from '../../services';
import { ToDo } from '../../models';

@Injectable()
export class TodoEffects
{
  @Effect()
  getTodos$ = this.actions$.pipe(
    ofType<GetTodos>(TodoActionTypes.GetTodos),
    withLatestFrom(this.store.pipe(select(getTodos))),
    filter(([, todos]) => !todos.length),
    mergeMap(() => this.todoService.getTodos()),
    map(todoResponse => new GetTodosSuccess({ todos: todoResponse.todos }))
  );

  @Effect()
  addTodo$ = this.actions$.pipe(
    ofType<AddTodo>(TodoActionTypes.AddTodo),
    mergeMap(({ payload }) =>
      this.todoService.addTodo(payload.text, payload.userId)
        .pipe(
          map(res => new AddTodoSuccess({ todo: { _id: res.todoID, content: payload.text, completed: false } })),
          tap(() => this.router.navigateByUrl('Todo'))
        )
    ),
  );

  @Effect()
  editTodo$ = this.actions$.pipe(
    ofType<EditTodo>(TodoActionTypes.EditTodo),
    mergeMap(({ payload }) => this.todoService.editTodo(payload.id, payload.text)
      .pipe(
        map(() => new EditTodoSuccess({ todo: { id: payload.id, changes: { content: payload.text } } })),
        tap(() => this.router.navigateByUrl('Todo'))
      )
    )
  );

  @Effect()
  deleteTodo$ = this.actions$.pipe(
    ofType<DeleteTodo>(TodoActionTypes.DeleteTodo),
    mergeMap(({ payload }) => this.todoService.deleteTodo(payload.id)
      .pipe(
        map(() => new DeleteTodoSuccess({ id: payload.id }))
      )
    )
  );

  @Effect()
  toggleTodo$ = this.actions$.pipe(
    ofType<ToggleTodo>(TodoActionTypes.ToggleTodo),
    mergeMap(({ payload }) => this.todoService.toggleTodo(payload.id)
      .pipe(
        map(() => new ToggleTodoSuccess({ id: payload.id }))
      )
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) { }
}
