import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { SignUpSuccess, ShowLoader, SetMessage } from '../../store/actions';
import { AppState } from '../../store/reducers';
import { AuthService } from '../../services';
import { Handler, MessageTypeEnum } from '../../shared';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy
{
  signUpForm: FormGroup;
  hidePassword = true;
  signUpSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    public handler: Handler
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
    this.store.dispatch(new ShowLoader());

    this.signUpSubs = this.auth
      .signUp(name, userName, email, password)
      .subscribe(
        {
          next: () => this.store.dispatch(new SignUpSuccess()),
          error: (err: Error) =>
          {
            this.handler.errorHandler(err);
            return of();
          }
        }
      );
  }

  ngOnDestroy()
  {
    this.signUpSubs.unsubscribe();
  }
}
