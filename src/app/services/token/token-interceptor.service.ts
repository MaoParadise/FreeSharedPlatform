import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private injector: Injector
  ) { }

  intercept(req, next){
    let authService = this.injector.get(AuthenticationService);
    let tokenizedReq = req.clone({
      withCredentials: true,
      setHeaders: {
        observe: 'body',
        Authorization: `Bearer ${authService.getToken()}`,
        ContentType : 'application/json',
        responseType: 'json'
      }
    })
    return next.handle(tokenizedReq);
  }
  

}
