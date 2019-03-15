import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { SetupService } from '../configuration/setup.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URI: string = this._setup.getAPI_URI();

  constructor(
    private http: HttpClient,
    private _setup: SetupService
  ) { }

  
  checkUser(username, password, value: boolean){
    return this.http.post(`${this.API_URI}/user/auth/signin`, {
      email: username,
      password: password,
    });
  }

  logoutUser(){
    return this.http.get(`${this.API_URI}/user/auth/logout`);
  }

  loggeIn(){
    return !!localStorage.getItem('-trak-');
  }

  loggeInInformation(){
    return !!localStorage.getItem('-bdI-');
  }

  getToken(){
    return localStorage.getItem('-trak-');
  }

} 
