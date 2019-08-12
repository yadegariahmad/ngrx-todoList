import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorHandler } from '../../shared/errorHandler';

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

  constructor(private fb: FormBuilder) { }

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
    console.log(this.signUpForm.value, this.signUpForm.valid);
  }
}
