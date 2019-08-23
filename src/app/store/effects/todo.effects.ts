import { Injectable } from '@angular/core';
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
          map((res) =>
          {
            const todo: ToDo = { _id: res.todoID, text: payload.text, completed: false };
            this.store.dispatch(new AddTodoSuccess({ todo }));
          }),
        )
    ),
  );

  @Effect()
  editTodo$ = this.actions$.pipe(
    ofType<EditTodo>(TodoActionTypes.EditTodo),
    mergeMap(({ payload }) => this.todoService.editTodo(payload.id, payload.text)
      .pipe(
        map(() =>
        {
          const changes: Update<ToDo> = {
            id: payload.id,
            changes: { text: payload.text }
          };
          this.store.dispatch(new EditTodoSuccess({ todo: changes }));
        })
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
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) { }
}
