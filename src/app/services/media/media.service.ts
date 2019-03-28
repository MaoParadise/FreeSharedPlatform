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
}