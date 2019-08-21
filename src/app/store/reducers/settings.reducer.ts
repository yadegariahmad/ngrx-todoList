import { SettingsActions, SettingsActionTypes } from '../actions';
import { MessageTypeEnum } from '../../shared';


export interface SettingsState
{
  showLoader: boolean;
  message: string;
  messageType: MessageTypeEnum;
}

export const initialSettingsState: SettingsState = {
  showLoader: false,
  message: undefined,
  messageType: undefined
};

export function settingsReducer(state = initialSettingsState, action: SettingsActions): SettingsState
{
  switch (action.type)
  {
    case SettingsActionTypes.SetMessage:
      return {
        ...state,
        message: action.payload.messageText,
        messageType: action.payload.messageType
      };

    case SettingsActionTypes.ShowLoader:
      return {
        ...state,
        showLoader: true
      };

    case SettingsActionTypes.HideLoader:
      return {
        ...state,
        showLoader: false
      };

    default:
      return state;
  }
}
