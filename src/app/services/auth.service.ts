import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { Credentials } from '../api/models';

import { AuthControllerService } from '../api/services';
import { LOGIN_URL } from '../config';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { AuthTokenStorageService } from './auth-token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authTokenStorage: AuthTokenStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authController: AuthControllerService,
  ) { }

  // https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
  isAuthenticated(): boolean {
    const token = this.authTokenStorage.get();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  isAuthenticated$ = new BehaviorSubject(this.isAuthenticated());

  login({ email, password }: Credentials) {
    return this.authController
      .login({ body: { email, password } })
      .pipe(
        catchError(err => {
          throw err?.status === HttpStatusCode.Unauthorized
            ? new InvalidCredentialsError()
            : err;
        }),
        map(({ accessToken }) => {
          this.authTokenStorage.set(accessToken);
          this.updateIsAuthenticated$();
          this.router.navigate(['/']);
        }),
      );
  }

  private updateIsAuthenticated$() {
    this.isAuthenticated$.next(this.isAuthenticated());
  }

  signOut() {
    this.authTokenStorage.remove();
    this.updateIsAuthenticated$();
    this.router.navigate([LOGIN_URL]);
  }

}
