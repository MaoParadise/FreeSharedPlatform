import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  data: any;
  API_URI: string = 'https://bako-app.herokuapp.com/api';

  bodyCredentials: any = {
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
    responseType: 'json'
  }


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAPI_URI(){
    return this.API_URI;
  }

  validateCredentials(){
    this.http.get(`${this.API_URI}/user/auth/check`).subscribe(
      (res)=>{
        this.data = res;
        if(this.data.success == false){
          this.removeLocalStorage();
          window.location.href = "/login";
        }
      },
      (err)=>{
        this.removeLocalStorage();
        window.location.href = "/login";
      }
    )
  }

  makeLocalStorage(bodyInfo: string, bdI: string){
    localStorage.setItem('-trak-', bodyInfo);
    localStorage.setItem('-bdI-', bdI);
  }

  removeLocalStorage(){
    localStorage.removeItem('-bdI-');
    localStorage.removeItem('-trak-');
  }


  getUserInformation(){
    return JSON.parse(localStorage.getItem('-bdI-'));
  }

  getCurrentUserOrPublicName(conditional: boolean){
    if(conditional){
      if(localStorage.getItem('-bdI-') == null){
        return 'invalid-user';
      }else{
        return JSON.parse(localStorage.getItem('-bdI-'))._crtU
      }
    }else{
      if(localStorage.getItem('-bdI-') == null){
        return 'no-publicName';
      }else{
        return JSON.parse(localStorage.getItem('-bdI-'))._crtPU
      }
      
    }
  }

  getCurrentEmail(){
    if(localStorage.getItem('-bdI-') == null){
      return 'no-email'
    }else{
      return JSON.parse(localStorage.getItem('-bdI-'))._email
    }
    
  }
  
  getCurrentImg(){
    if(localStorage.getItem('-bdI-') == null){
      return 'no-profile'
    }else{
      return JSON.parse(localStorage.getItem('-bdI-'))._crtImg
    }
    
  }

  getCurrentStatus(){
    if(localStorage.getItem('-bdI-') == null){
      return 'no-status'
    }else{
      return JSON.parse(localStorage.getItem('-bdI-'))._crtSts
    }
  }


}
