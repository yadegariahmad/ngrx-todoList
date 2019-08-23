import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todoReducer } from '../../store/reducers/todo.reducer';
import { TodoEffects } from '../../store/effects/todo.effects';
import { TodoModule } from '../todo/todo.module';
import { CheckAuthGuard } from '../../guards/check-auth.guard';
import { TodoService } from '../../services';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [CheckAuthGuard] }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    TodoModule
  ],
  providers: [CheckAuthGuard, TodoService]
})
export class HomeModule { }
