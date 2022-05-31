/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    body: Credentials
  }): Observable<StrictHttpResponse<{
'accessToken': string;
'refreshToken': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'accessToken': string;
        'refreshToken': string;
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    body: Credentials
  }): Observable<{
'accessToken': string;
'refreshToken': string;
}> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<{
'accessToken': string;
'refreshToken': string;
}>) => r.body as {
'accessToken': string;
'refreshToken': string;
})
    );
  }

  /**
   * Path part for operation authControllerRefreshToken
   */
  static readonly AuthControllerRefreshTokenPath = '/refresh-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshToken$Response(params: {
    body: {
'refreshToken': string;
}
  }): Observable<StrictHttpResponse<{
'accessToken': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerRefreshTokenPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'accessToken': string;
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `refreshToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshToken(params: {
    body: {
'refreshToken': string;
}
  }): Observable<{
'accessToken': string;
}> {

    return this.refreshToken$Response(params).pipe(
      map((r: StrictHttpResponse<{
'accessToken': string;
}>) => r.body as {
'accessToken': string;
})
    );
  }

}
