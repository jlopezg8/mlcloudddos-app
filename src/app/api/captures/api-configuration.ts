/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'http://[::1]:3001';
}

/**
 * Parameters for `CapturesApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
