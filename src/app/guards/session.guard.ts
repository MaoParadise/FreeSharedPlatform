import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  data: any;

  constructor(
    private _authService: AuthenticationService,
    private router: Router
  ){}


  canActivate(){
   return true;
  }
}
