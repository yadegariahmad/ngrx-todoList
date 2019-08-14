import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Login, SignUpSuccess } from '../actions';
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
      this.router.navigateByUrl('/Home');
    })
  );

  @Effect()
  init$ = defer(() =>
  {
    const userData = localStorage.getItem('userId');
    if (userData && userData !== 'undefined')
    {
      return of(new Login({ userId: userData }));
    }
    else
    {
      this.router.navigateByUrl('/Auth');
      return of();
    }
  });

  constructor(private actions$: Actions, private router: Router) { }
}
