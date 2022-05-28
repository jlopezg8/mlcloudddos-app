import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, concatMap, map } from 'rxjs';

import { UserControllerService } from '../api/services';
import { LOGIN_URL } from '../config';
import { InvalidCredentialsError } from '../errors/auth';
import { Credentials, NewUser } from '../models';
import { AuthTokenStorageService } from './auth-token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authTokenStorage: AuthTokenStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private userController: UserControllerService,
  ) { }

  createUser({ email, password }: NewUser) {
    return this.userController
      .signUp({ body: { email, password } });
  }

  // https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
  isAuthenticated(): boolean {
    const token = this.authTokenStorage.get();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  isAuthenticated$ = new BehaviorSubject(this.isAuthenticated());

  login({ email, password }: Credentials) {
    return this.userController
      .login({ body: { email, password } })
      .pipe(
        catchError(err => {
          throw err?.status === 401
            ? new InvalidCredentialsError()
            : err;
        }),
        map(({ token }) => this.storeAuthTokenAndGoHome(token)),
      );
  }

  private storeAuthTokenAndGoHome(token: string | undefined) {
    if (token === undefined) {
      throw new Error('the auth API did not return a token, for some reason');
    }
    this.authTokenStorage.set(token);
    this.updateIsAuthenticated$();
    this.router.navigate(['/']);
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
