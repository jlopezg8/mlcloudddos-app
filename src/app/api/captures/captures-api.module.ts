/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CaptureControllerService } from './services/capture-controller.service';
import { PingControllerService } from './services/ping-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CaptureControllerService,
    PingControllerService,
    ApiConfiguration
  ],
})
export class CapturesApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<CapturesApiModule> {
    return {
      ngModule: CapturesApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: CapturesApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('CapturesApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
