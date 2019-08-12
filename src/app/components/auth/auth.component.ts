import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../store/reducers';
import { didSignUp } from '../../store/selectors';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit
{
  mode = 'signIn';
  didSignUp$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit()
  {
    this.didSignUp$ = this.store
      .pipe(
        select(didSignUp),
        tap(isSignedUp =>
        {
          console.log(isSignedUp);

          this.mode = isSignedUp ? 'signIn' : 'SignUp';
        })
      );
  }

}
