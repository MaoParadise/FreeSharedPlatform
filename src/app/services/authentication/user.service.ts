import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SetupService } from '../configuration/setup.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI: string = this._setup.getAPI_URI();

  constructor(
    private http: HttpClient,
    private _setup: SetupService
  ) { }

  showUsers(){
    return this.http.get(`${this.API_URI}/user`);
  }

  createUser(email, user, password, publicName){
    return this.http.post(`${this.API_URI}/user`, {
      email: email,
      user: user,
      password: password,
      publicName: publicName
    },{
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getUser(_id: string){
    return this.http.get(`${this.API_URI}/user/${_id}`);
  }

}
