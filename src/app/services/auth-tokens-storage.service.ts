import { Injectable } from '@angular/core';

import {
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_REFRESH_TOKEN,
} from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthTokensStorageService {

  getAccessToken() {
    return localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);
  }

  store(accessToken: string, refreshToken?: string) {
    localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, accessToken);
    if (refreshToken != null) {
      localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, refreshToken);
    }
  }

  removeAll() {
    localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY_REFRESH_TOKEN);
  }

}
