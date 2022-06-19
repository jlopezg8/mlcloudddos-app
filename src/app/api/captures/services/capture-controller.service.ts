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

import { Capture } from '../models/capture';

@Injectable({
  providedIn: 'root',
})
export class CaptureControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation captureControllerDownload
   */
  static readonly CaptureControllerDownloadPath = '/captures/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `download()` instead.
   *
   * This method doesn't expect any request body.
   */
  download$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CaptureControllerService.CaptureControllerDownloadPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `download$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  download(params: {
    id: string;
  }): Observable<Blob> {

    return this.download$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation captureControllerListMine
   */
  static readonly CaptureControllerListMinePath = '/captures';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listMine()` instead.
   *
   * This method doesn't expect any request body.
   */
  listMine$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Capture>>> {

    const rb = new RequestBuilder(this.rootUrl, CaptureControllerService.CaptureControllerListMinePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Capture>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listMine$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listMine(params?: {
  }): Observable<Array<Capture>> {

    return this.listMine$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Capture>>) => r.body as Array<Capture>)
    );
  }

  /**
   * Path part for operation captureControllerUpload
   */
  static readonly CaptureControllerUploadPath = '/captures';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `upload()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  upload$Response(params: {

    /**
     * Request body for multipart/form-data based file upload
     */
    body: {
'file'?: Blob;
}
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CaptureControllerService.CaptureControllerUploadPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `upload$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  upload(params: {

    /**
     * Request body for multipart/form-data based file upload
     */
    body: {
'file'?: Blob;
}
  }): Observable<void> {

    return this.upload$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
