import { Injectable } from '@angular/core';
import { SetupService } from '../configuration/setup.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  API_URI = this._setup.getAPI_URI();

  constructor(
    private http: HttpClient,
    private _setup: SetupService
    ) { }

  getMediaLike(query){
    return this.http.post(`${this.API_URI}/media/find/title`, {
      title: query
    });
  }

  getMediaUser(){
    return this.http.get(`${this.API_URI}/media/find/id`);
  }

  saveMedia(form: FormData){
    return this.http.post(`${this.API_URI}/media/`, form)
  }

  updateMedia(dataMedia: any){
    return this.http.put(`${this.API_URI}/media/`, dataMedia)
  }

  pushReferences(id: string, data: any){
    return this.http.post(`${this.API_URI}/media/push/references`, 
    {
      id: id,
      references: data
    })
  }

}
