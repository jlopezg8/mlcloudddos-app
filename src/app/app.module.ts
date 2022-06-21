import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { lastValueFrom } from 'rxjs';

import { AuthApiModule } from './api/auth/auth-api.module';
import { CapturesApiModule } from './api/captures/captures-api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudsComponent } from './components/clouds/clouds.component';
import { SideContentComponent } from './components/side-content/side-content.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {
  AUTH_API_DOMAIN,
  AUTH_API_REFRESH_TOKEN_PATH,
  AUTH_API_ROOT_URL,
  CAPTURES_API_DOMAIN,
  CAPTURES_API_ROOT_URL,
} from './config';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AuthService } from './services/auth.service';

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
    // https://www.npmjs.com/package/@auth0/angular-jwt
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: (auth: AuthService) => ({
          tokenGetter(request: HttpRequest<any>) {
            // Do not try to get the stored token if the request is to get a
            // new one:
            if (request.url.includes(AUTH_API_REFRESH_TOKEN_PATH)) {
              return null;
            } else {
              // tokenGetter can return a Promise, but not an Observable:
              return lastValueFrom(auth.getAccessToken());
            }
          },
          allowedDomains: [AUTH_API_DOMAIN, CAPTURES_API_DOMAIN],
        }),
        deps: [AuthService],
      },
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
