import { Action } from '@ngrx/store';

export enum AuthActionTypes
{
  LoginAction = '[Login] Action',
  SignUpSuccess = '[SignUp] Signed up',
}

export class Login implements Action
{
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { userId: string, token: string }) { }
}


export class SignUpSuccess implements Action
{
  readonly type = AuthActionTypes.SignUpSuccess;
}


export type AuthActions = Login | SignUpSuccess;
