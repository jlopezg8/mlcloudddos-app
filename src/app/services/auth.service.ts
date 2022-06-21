import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import { Credentials, MyUserProfile } from '../api/auth/models';
import { AuthControllerService } from '../api/auth/services';
import { LOGIN_URL } from '../config';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { AuthTokensStorageService } from './auth-tokens-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authEvent$ = new BehaviorSubject(undefined);

  constructor(
    private authController: AuthControllerService,
    private authTokensStorage: AuthTokensStorageService,
    // Can't use JwtHelperService, since it's provided in JwtModule, whose
    // configuration is depending on AuthService, which in turn would depend on
    // JwtHelperService, resulting in a circular dependency:
    //private jwtHelper: JwtHelperService,
    private router: Router,
  ) { }

  getAccessToken(): Observable<string | null> {
    const accessToken = this.authTokensStorage.getAccessToken();
    if (accessToken == null) {
      return of(null);
    } else if (!isJwtTokenExpired(accessToken)) {
      return of(accessToken);
    } else {
      return this.getFreshAccessToken();
    }
  }

  private getFreshAccessToken() {
    const refreshToken = this.authTokensStorage.getRefreshToken();
    if (refreshToken == null || isJwtTokenExpired(refreshToken)) {
      this.authTokensStorage.removeAll();
      this.authEvent$.next(undefined);
      return of(null);
    } else {
      return this.authController
        .refreshToken({ body: { refreshToken } })
        .pipe(
          map(({ accessToken }) => {
            this.authTokensStorage.store(accessToken);
            this.authEvent$.next(undefined);
            return accessToken;
          }),
        );
    }
  }

  getUserProfile() {
    return this.getAccessToken().pipe(
      map(accessToken =>
        accessToken == null
          ? null
          : decode(accessToken).payload as MyUserProfile
      )
    );
  }

  isAuthenticated() {
    return this.getAccessToken().pipe(
      map(accessToken => accessToken != null)
    );
  }

  isAuthenticated$ = this.authEvent$.pipe(
    switchMap(() => this.isAuthenticated()),
  );

  isAdmin$ = this.authEvent$.pipe(
    switchMap(() => this.getUserProfile()),
    map(userProfile => userProfile?.role === 'ADMIN'),
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
        map(({ accessToken, refreshToken }) => {
          this.authTokensStorage.store(accessToken, refreshToken);
          this.authEvent$.next(undefined);
          this.router.navigate(['/']);
        }),
      );
  }

  signOut() {
    this.authTokensStorage.removeAll();
    this.authEvent$.next(undefined);
    this.router.navigate([LOGIN_URL]);
  }

}
