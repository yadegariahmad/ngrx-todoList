import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todoReducer } from '../../store/reducers/todo.reducer';
import { TodoEffects } from '../../store/effects/todo.effects';
import { TodoModule } from '../todo/todo.module';
import { CheckAuthGuard } from '../../guards/check-auth.guard';
import { TodoService } from '../../services';
import { HomeComponent } from './home.component';
import { AddComponent } from '../add/add.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [CheckAuthGuard] },
  { path: 'Add', component: AddComponent, canActivate: [CheckAuthGuard] }
];

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    TodoModule
  ],

  exports: [TranslateModule],

  providers: [CheckAuthGuard, TodoService]
})
export class HomeModule { }
