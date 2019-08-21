import { TodoActions, TodoActionTypes } from '../actions';

export interface TodoState
{
  id: string;
  text: string;
  completed: boolean;
}

export const initialTodotate: TodoState[] = [];

export function settingsReducer(state = initialTodotate, action: TodoActions): TodoState[]
{
  switch (action.type)
  {
    case TodoActionTypes.GetTodos:
      return [];

    case TodoActionTypes.AddTodo:
      return [];

    case TodoActionTypes.EditTodo:
      return [];

    case TodoActionTypes.ToggleTodo:
      return [];

    case TodoActionTypes.DeleteTodo:
      return [];

    default:
      return state;
  }
}
