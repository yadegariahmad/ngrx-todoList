import { Action } from '@ngrx/store';
import { MessageTypeEnum } from '../../shared';

export enum SettingsActionTypes
{
  SetMessage = '[Message] Action',
  ShowLoader = '[Loader] Show',
  HideLoader = '[Loader] Hide',
}

export class SetMessage implements Action
{
  readonly type = SettingsActionTypes.SetMessage;

  constructor(public payload: { messageText: string, messageType: MessageTypeEnum }) { }
}

export class ShowLoader implements Action
{
  readonly type = SettingsActionTypes.ShowLoader;
}

export class HideLoader implements Action
{
  readonly type = SettingsActionTypes.HideLoader;
}

export type SettingsActions = SetMessage | ShowLoader | HideLoader;
