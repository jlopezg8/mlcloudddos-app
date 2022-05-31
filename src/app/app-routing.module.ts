import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'captures',
    loadChildren: () => import('./modules/captures/captures.module').then(m => m.CapturesModule),
    canLoad: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/captures',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
