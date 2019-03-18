import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  validateSpecialChar(text){
    let out: boolean = true;
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890_-';

    for (var i=0; i<text.length; i++){
      if(out){
       if (!(filtro.indexOf(text.charAt(i)) > -1)) {
        out = false;
       }
      }
    }
    return out;
  }

  lookRepeat( dataPush: any ,push : any){
    let repeat = 0;
    for(let i = 0; i < dataPush.length ; i++){
      if(dataPush[i].NAMECATEGORY == push.NAMECATEGORY){
        repeat++;
      }
    }
    if(repeat > 1){
      return true;
    }else{
      return false;
    }
  }

  lookRepeatString( dataPush: any ,push : string){
    let repeat = 0;
    for(let i = 0; i < dataPush.length ; i++){
      if(dataPush[i].NAMECATEGORY == push){
        repeat++;
      }
    }
    if(repeat > 1){
      return true;
    }else{
      return false;
    }
  }

  processRepeatSimple(data: any){
    var map = {};
    var result = [];
    for(let i= 0, length = data.length; i < length ; i++ ){
      if(!(data[i] in map)){ 
        map[data[i]] = true;
        result.push(data[i]);
      }
    }
    return result;
  }

  ItsPresent(NoneDataPush: any, noneData: any){
    let itsPresent: boolean = false;
    for(let i = 0; i < NoneDataPush.length; i++){
      if(NoneDataPush[i].NAMECATEGORY == noneData){
        itsPresent = true;
        return itsPresent;
      }
    }
    return itsPresent;
  }

  separateAndReplace(sentence: string){
    return sentence.replace(/ /g, "").split(';')
  }

  separateAndReplaceAndMinus(sentence: string){
    return sentence.toLowerCase().replace(/ /g, "").split(';');
  }

  replaceSendVideo(sentence: string){
    return sentence.replace(/-/g,"/").replace(/¿/g,"?").replace('+','=');
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

}
