import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map } from 'rxjs';

import { Credentials, MyUserProfile } from '../api/auth/models';
import { AuthControllerService } from '../api/auth/services';
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

  getUserProfile() {
    const token = this.authTokenStorage.get();
    return token != null && !this.jwtHelper.isTokenExpired(token)
      ? this.jwtHelper.decodeToken(token) as MyUserProfile
      : undefined;
  }

  isAuthenticated() {
    return this.getUserProfile() !== undefined;
  }

  isAuthenticated$ = new BehaviorSubject(this.isAuthenticated());

  isAdmin$ = this.isAuthenticated$.pipe(
    map(() => this.getUserProfile()?.role === 'ADMIN')
  );

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
          this.isAuthenticated$.next(true);
          this.router.navigate(['/']);
        }),
      );
  }

  signOut() {
    this.authTokenStorage.remove();
    this.isAuthenticated$.next(false);
    this.router.navigate([LOGIN_URL]);
  }

}
