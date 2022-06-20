import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { LOGIN_URL } from '../config';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      // Redirect to the login page
      return this.router.parseUrl(LOGIN_URL);
    }
    return true;
  }

  canLoad() {
    return this.canActivate();
  }

}
