import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Login } from '../actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';

@Injectable()
export class AuthEffects
{

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action =>
    {
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('token', action.payload.token);
      this.router.navigateByUrl('/Todo');
    })
  );

  @Effect()
  init$ = defer(() =>
  {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && userId !== 'undefined')
    {
      return of(new Login({ userId, token }));
    }
    else
    {
      this.router.navigateByUrl('/Auth');
      return of();
    }
  });

  constructor(private actions$: Actions, private router: Router) { }
}
