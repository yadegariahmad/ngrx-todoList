import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
import { ConvertDigitPipe } from '../../pipes/convert-digit.pipe';

@NgModule({
  declarations: [
    TodoComponent,
    ConvertDigitPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TodoComponent,
    ConvertDigitPipe
  ]
})
export class TodoModule { }
