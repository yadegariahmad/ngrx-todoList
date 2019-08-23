import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers';
import { getTodos } from '../../store/selectors';
import { GetTodos, DeleteTodo, ToggleTodo } from '../../store/actions';
import { date } from '../../shared/consts';
import { ToDo } from '../../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit
{
  date: string;
  todos$: Observable<Array<ToDo>>;

  constructor(private store: Store<AppState>)
  {
    this.date = date();
    this.store.dispatch(new GetTodos());
  }

  ngOnInit()
  {
    this.todos$ = this.store.pipe(select(getTodos));
  }

  deleteTodo(todoId: string)
  {
    this.store.dispatch(new DeleteTodo({ id: todoId }));
  }

  toggleTodo(todoId: string)
  {
    this.store.dispatch(new ToggleTodo({ id: todoId }));
  }
}
