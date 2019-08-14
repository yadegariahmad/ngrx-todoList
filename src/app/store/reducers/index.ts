import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { settingsReducer, SettingsState } from './settings.reducer';

export interface AppState
{
  router: RouterReducerState;
  settings: SettingsState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  settings: settingsReducer
};
