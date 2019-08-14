import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<AppState>) { }

  ngOnInit()
  {
    this.store
      .select(didSignUp)
      .subscribe(
        {
          next: (isSignedUp: boolean) => this.mode = isSignedUp ? 'signIn' : 'SignUp'
        }
      );
  }

}
