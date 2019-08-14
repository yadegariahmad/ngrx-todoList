import { createSelector } from '@ngrx/store';
import { SettingsState } from '../reducers/settings.reducer';

export const selectSettingsState = state => state.settings;

export const showLoader = () => createSelector(
  selectSettingsState,
  (settings: SettingsState) => settings.showLoader
);

export const getMessage = () => createSelector(
  selectSettingsState,
  (settings: SettingsState) => ({ text: settings.message, type: settings.messageType })
);
