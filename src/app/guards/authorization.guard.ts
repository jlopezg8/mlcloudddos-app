import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private auth: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3#2f80
    // this will be passed from the route config on the data property
    const allowedRoles: string[] = route.data['allowedRoles'] ?? [];
    const userRole = this.auth.getUserProfile()?.role;
    return !!userRole && allowedRoles.includes(userRole);
  }

}
