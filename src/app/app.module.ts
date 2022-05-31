import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";

import { AuthApiModule } from './api/auth/auth-api.module';
import { CapturesApiModule } from './api/captures/captures-api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudsComponent } from './components/clouds/clouds.component';
import { SideContentComponent } from './components/side-content/side-content.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {
  AUTH_API_DOMAIN,
  AUTH_API_ROOT_URL,
  CAPTURES_API_DOMAIN,
  CAPTURES_API_ROOT_URL,
} from './config';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AuthTokenStorageService } from './services/auth-token-storage.service';

const authTokenStorage = new AuthTokenStorageService();

@NgModule({
  declarations: [
    AppComponent,
    CloudsComponent,
    SideContentComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // https://www.npmjs.com/package/ng-openapi-gen#specifying-the-root-url--web-service-endpoint
    AuthApiModule.forRoot({ rootUrl: AUTH_API_ROOT_URL }),
    CapturesApiModule.forRoot({ rootUrl: CAPTURES_API_ROOT_URL }),
    // https://www.npmjs.com/package/@auth0/angular-jwt#usage-injection
    JwtModule.forRoot({
      config: {
        tokenGetter: () => authTokenStorage.get(),
        allowedDomains: [AUTH_API_DOMAIN, CAPTURES_API_DOMAIN],
      },
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
