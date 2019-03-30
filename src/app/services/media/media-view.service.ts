import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaViewService {

  private step: number = 1;

  constructor() { }

  getStep(){
    return this.step;
  }

  setStep(step: number){
    this.step = step;
  }

}
