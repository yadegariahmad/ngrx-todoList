import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/reducers';
import { didSignUp } from '../../store/selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy
{
  mode = 'signIn';
  signUpSelectSubs: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit()
  {
    this.signUpSelectSubs = this.store
      .select(didSignUp)
      .subscribe(
        {
          next: (isSignedUp: boolean) => this.mode = isSignedUp ? 'signIn' : 'SignUp',
        }
      );
  }

  ngOnDestroy()
  {
    this.signUpSelectSubs.unsubscribe();
  }

}
