import { TestBed } from '@angular/core/testing';

import { AuthTokensStorageService } from './auth-tokens-storage.service';

describe('AuthTokensStorageService', () => {
  let service: AuthTokensStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokensStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
