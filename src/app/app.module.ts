import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";

import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudsComponent } from './components/clouds/clouds.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AUTH_API_DOMAIN, AUTH_API_ROOT_URL } from './config';
import { MaterialDesignModule } from './modules/material-design.module';
import { AuthTokenStorageService } from './services/auth-token-storage.service';

const authTokenStorage = new AuthTokenStorageService();

@NgModule({
  declarations: [
    AppComponent,
    CloudsComponent,
    FooterComponent,
    HomeComponent,
    SidenavContentComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // https://www.npmjs.com/package/ng-openapi-gen#specifying-the-root-url--web-service-endpoint
    ApiModule.forRoot({ rootUrl: AUTH_API_ROOT_URL }),
    // https://www.npmjs.com/package/@auth0/angular-jwt#usage-injection
    JwtModule.forRoot({
      config: {
        tokenGetter: () => authTokenStorage.get(),
        allowedDomains: [AUTH_API_DOMAIN],
      },
    }),
    BrowserAnimationsModule,
    MaterialDesignModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
