import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthenticationService,
    private router: Router
    ){}

    canActivate(): boolean{
      if(this._authService.loggeIn()){
        return true;
      }else{
        window.location.href = "/login";
        return false;
      }
    }
}
