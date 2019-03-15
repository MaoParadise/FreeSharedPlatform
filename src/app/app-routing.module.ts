import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelComponent } from './components/channels/channel/channel.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { TestComponent } from './components/testing/test/test.component';
import { ProfileComponent } from './components/channels/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { SessionGuard } from './guards/session.guard';

const routes: Routes = [{
  path: '',
  redirectTo: '/channel',
  pathMatch: 'full'

},
{
  path: 'channel',
  component: ChannelComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'test',
  component: TestComponent,
  canActivate: [AuthGuard]
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
