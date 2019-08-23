import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoActions, TodoActionTypes } from '../actions';
import { ToDo } from '../../models';

export const adapter: EntityAdapter<ToDo> = createEntityAdapter<ToDo>({
  selectId: (todo: ToDo) => todo._id // use _id instead of default id
});

export const initialTodotate: EntityState<ToDo> = adapter.getInitialState();

export interface TodoState extends EntityState<ToDo> { }

export function todoReducer(state = initialTodotate, action: TodoActions): EntityState<ToDo>
{
  switch (action.type)
  {
    case TodoActionTypes.GetTodosSuccess:
      return adapter.addAll(action.payload.todos, state);

    case TodoActionTypes.AddTodoSuccess:
      return adapter.addOne(action.payload.todo, state);

    case TodoActionTypes.EditTodoSuccess:
      return adapter.updateOne(action.payload.todo, state);

    case TodoActionTypes.ToggleTodoSuccess:
      return adapter.map(todo =>
        todo._id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : { ...todo }
        , state
      );

    case TodoActionTypes.DeleteTodoSuccess:
      return adapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
