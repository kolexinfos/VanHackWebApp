import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule, NgProgressBrowserXhr  } from 'ngx-progressbar';
import { BrowserXhr, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { AlertService, AuthenticationService, MiscService, MiscResolve } from './_services/index';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { AuthGuard } from './_guards/index';
import { AppConfig } from './app.config';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './_directives/alert.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ThreadComponent } from './thread/thread.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MainComponent,
    children : [
      {path: '', component: HomeComponent, pathMatch: 'full', resolve: { posts : MiscResolve}},
      {path: 'new', component: NewComponent},
      {path: 'thread', component: ThreadComponent},
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    NewComponent,
    ThreadComponent,
  ],
  imports: [
    BrowserModule,
    NgProgressModule,
    BrowserAnimationsModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true }
    )
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    MiscService,
    MiscResolve,
    AppConfig,
     { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
