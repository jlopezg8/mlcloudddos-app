import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { allowedRoles: ['ADMIN'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
