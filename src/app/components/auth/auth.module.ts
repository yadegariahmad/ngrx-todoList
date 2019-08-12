import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AuthComponent } from './auth.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class AuthModule { }
