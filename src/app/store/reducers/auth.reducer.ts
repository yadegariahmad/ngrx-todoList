import { AuthActions, AuthActionTypes } from '../actions';


export interface AuthState
{
  signUpSuccess: boolean;
  loggedIn: boolean;
  userId: string;
}

export const initialAuthState: AuthState = {
  signUpSuccess: false,
  loggedIn: false,
  userId: undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState
{
  switch (action.type)
  {
    case AuthActionTypes.LoginAction:
      return {
        signUpSuccess: false,
        loggedIn: true,
        userId: action.payload.userId
      };

    case AuthActionTypes.SignUpSuccess:
      return {
        signUpSuccess: true,
        loggedIn: false,
        userId: undefined
      };

    default:
      return state;
  }
}
