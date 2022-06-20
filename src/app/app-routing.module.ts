import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'captures',
    loadChildren: () => import('./modules/captures/captures.module').then(m => m.CapturesModule),
    canLoad: [AuthenticationGuard],
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
