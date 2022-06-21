import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { map } from 'rxjs';

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
    return this.auth.isAuthenticated().pipe(
      map(isAuthenticated =>
        // Redirect to the login page if not authenticated
        isAuthenticated || this.router.parseUrl(LOGIN_URL)
      )
    );
  }

  canLoad() {
    return this.canActivate();
  }

}
