import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'Todo', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'Auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },

  { path: '**', redirectTo: 'Auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
