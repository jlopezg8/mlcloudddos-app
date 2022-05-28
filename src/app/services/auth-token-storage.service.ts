import { Injectable } from '@angular/core';

import { AUTH_TOKEN_STORAGE_KEY } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenStorageService {

  constructor() { }

  get() {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  set(token: string) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }

  remove() {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
}
