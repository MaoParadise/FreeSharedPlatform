import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// imports of interceptors
import { TokenInterceptorService } from './services/token/token-interceptor.service';


//Angular Material
import { MaterialModule } from './tools/materia';
import { DefaultDialogComponent } from './components/tools/default-dialog/default-dialog.component';
import { ErrorDialogComponent } from './components/tools/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './components/tools/success-dialog/success-dialog.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChannelComponent } from './components/channels/channel/channel.component';
import { NotFoundComponent } from './components/channels/not-found/not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { TestComponent } from './components/testing/test/test.component';
import { ProfileComponent } from './components/channels/profile/profile.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { SessionGuard } from './guards/session.guard';
import { DashboardComponent } from './components/channels/dashboard/dashboard.component';
import { DashLibraryComponent } from './components/channels/dash-library/dash-library.component';
import { DashProfileComponent } from './components/channels/dash-profile/dash-profile.component';
import { DashSettingsComponent } from './components/channels/dash-settings/dash-settings.component';
;

@NgModule({
  declarations: [
    AppComponent,
    ChannelComponent,
    NotFoundComponent,
    NavigationComponent, 
    LoginComponent,
    RegisterComponent,
    TestComponent,
    ProfileComponent,
    DefaultDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    DashboardComponent,
    DashLibraryComponent,
    DashProfileComponent,
    DashSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents:[
    DefaultDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent
  ],
  providers: [AuthenticationService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    }, 
    AuthGuard,
    SessionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
