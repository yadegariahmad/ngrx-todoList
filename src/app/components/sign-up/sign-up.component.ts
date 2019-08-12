import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SignUpSuccess } from '../../store/actions';
import { AppState } from '../../store/reducers';
import { AuthService } from '../../services';
import { ErrorHandler } from '../../shared';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit
{
  signUpForm: FormGroup;
  hidePassword = true;
  errorHandler = new ErrorHandler();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.signUpForm = this.fb.group({
      name: [''],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  signUp()
  {
    const { name, userName, email, password } = this.signUpForm.value;

    this.auth.signUp(name, userName, email, password)
      .subscribe(
        () =>
        {
          this.store.dispatch(new SignUpSuccess());
        },
        (err) =>
        {// dispatch error
          console.log(err);
          return of();
        }
      );
  }
}
