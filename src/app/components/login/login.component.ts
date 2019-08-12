import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorHandler } from '../../shared/errorHandler';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit()
  {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login()
  {
    console.log(this.logInForm.value, this.logInForm.valid);
  }

}
