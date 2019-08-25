import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/reducers';
import { getTodoText } from '../../store/selectors';
import { AddTodo, EditTodo, ShowLoader } from '../../store/actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy
{
  content: string;
  editMode: boolean;
  todoId: string;
  queryParamsSubscription: Subscription;

  constructor(private actr: ActivatedRoute, private store: Store<AppState>)
  {
    this.queryParamsSubscription = this.actr.queryParams
      .subscribe(params =>
      {
        if (params['edit'] && params['id'])
        {
          this.editMode = true;
          this.todoId = params['id'];
          this.fetchTodoText(this.todoId);
        }
      });
  }

  fetchTodoText(todoId: string)
  {
    this.store
      .select(getTodoText(todoId))
      .subscribe({
        next: (todoText) => this.content = todoText
      });
  }

  ngOnInit()
  {
  }

  submit()
  {
    const userId = localStorage.getItem('userId');
    this.store.dispatch(new ShowLoader());

    if (!this.editMode) // Add
    {
      this.store.dispatch(new AddTodo({ text: this.content, userId }));
    } else // Edit
    {
      this.store.dispatch(new EditTodo({ id: this.todoId, text: this.content }));
    }
  }

  ngOnDestroy()
  {
    this.queryParamsSubscription.unsubscribe();
  }

}
