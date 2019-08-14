import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Login } from '../../store/actions';
import { AppState } from '../../store/reducers';
import { AuthService } from '../../services';
import { ErrorHandler } from '../../shared';
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
  errorHandler = new ErrorHandler();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>) { }

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

    this.auth.logIn(email, password)
      .subscribe(
        {
          next: (res: LoginResponse) =>
          {
            console.log(res);
            
            this.store.dispatch(new Login({ userId: res.userId }))
          },
          error: (err) =>
          {// dispatch error
            console.log(err);
            return of();
          }
        }
      );
  }
}
