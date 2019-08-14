import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Login, ShowLoader, SetMessage } from '../../store/actions';
import { AppState } from '../../store/reducers';
import { AuthService } from '../../services';
import { Handler, MessageTypeEnum } from '../../shared';
import { LoginResponse } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  logInForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    public handler: Handler
  ) { }

  ngOnInit()
  {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login()
  {
    const { email, password } = this.logInForm.value;
    this.store.dispatch(new ShowLoader());

    this.auth.logIn(email, password)
      .subscribe(
        {
          next: (res: LoginResponse) => this.store.dispatch(new Login({ userId: res.userId })),
          error: (err: Error) =>
          {
            this.store.dispatch(new SetMessage({
              messageText: err.message,
              messageType: MessageTypeEnum.Error
            }));
            return of();
          }
        }
      );
  }
}
