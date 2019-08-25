import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoComponent } from './todo.component';
import { ConvertDigitPipe } from '../../pipes/convert-digit.pipe';

@NgModule({
  declarations: [
    TodoComponent,
    ConvertDigitPipe
  ],

  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,

    MatIconModule
  ],

  exports: [
    TranslateModule,
    TodoComponent,
    ConvertDigitPipe,
  ]
})
export class TodoModule { }
