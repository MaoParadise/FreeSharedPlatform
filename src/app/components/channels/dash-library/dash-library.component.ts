import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { MediaViewService } from 'src/app/services/media/media-view.service';
import { GeneralService } from 'src/app/services/configuration/general.service';
import {NgxPaginationModule} from 'ngx-pagination'; 

@Component({
  selector: 'app-dash-library',
  templateUrl: './dash-library.component.html',
  styleUrls: ['./dash-library.component.css']
})
export class DashLibraryComponent implements OnInit {

  dataSearch: any;
  actualPage: number = 1;
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
  };
  spinnerStatus: boolean = false;
  mediaOption: number = 1;
  dataMedia: any;
  

  constructor(
    private _mediaService: MediaService,
    public _general: GeneralService,
    public _mediaView: MediaViewService
  ) { }

  ngOnInit() {
    this._mediaService.getMediaUser().subscribe(
      res =>{
        this.dataMedia = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  addMedia(){
    this._mediaView.setStep(1);
    if(this._mediaView.getStep() == 1){
      document.getElementById("step2").classList.remove("active");
      document.getElementById("step3").classList.remove("active");
    }else if(this._mediaView.getStep() == 2){
      document.getElementById("step3").classList.remove("active");
    }
    document.querySelector('.alert-danger').setAttribute('style',`display: none`);
    document.querySelector('.alert-success').setAttribute('style',`display: none`);
  }


  /* #region edit information area */ 

  singleMedia: any;
  indexMedia: number = -1; 

  loadInformation(media: any){
    this.singleMedia = media;
    this.NonedataPush = media.references;
    this.mediaOption = 2;
    this.indexMedia = this.dataMedia.indexOf(this.singleMedia);
    console.log(this.indexMedia);
  }
  backLibrary(){
    this.mediaOption = 1;
    this.singleMedia.statusMedia = 304;
    this.singleMedia.references = this.NonedataPush
  }

  references: string;
  NonedataPush: any = [];
  InvalidDataPush: any = [];
  maxData: number = 0;

  addNoneData(noneData : any){
    for(let i = 0; i < noneData.length; i++){
      if(this._general.ItsPresent(this.NonedataPush, noneData[i])){
        
      }else{
        if(noneData[i].length > 3){
          this.NonedataPush.push(
            noneData[i]
          )
          this.maxData++;
        }else{
          this.InvalidDataPush.push(
             noneData[i]
          )
          this.maxData++; 
        }
      }
    }
    console.log(this.NonedataPush);
  }

  deleteNoneData(index: number){
    this.NonedataPush.splice(index, 1);
    this.maxData--;
  }

  localSave(){
    this.singleMedia.statusMedia = 304;
    this.singleMedia.references = this.NonedataPush
    /* console.log(this.singleMedia);
    console.log(this.dataMedia[this.indexMedia]); */
  }

  /* #endregion */


  /* #region title-search area */ 

    showDropDown = false;
    dissapearDropDown:number = 0;
  
    onChangeSearch(){
        if(this.singleMedia.title.length > 3){
          this._mediaService.getMediaLike(this.singleMedia.title).subscribe(
            res =>{
             this.dataSearch = res;
             this.showDropDown = true;
         }, 
           err => {
              console.log(err);
            }
         );
        }
    } 
  
    toggleDropDown(){
      this.showDropDown = !this.showDropDown;
      if(this.showDropDown == false){
        this.dissapearDropDown = 0;
      }
    }
  
    onClickedOutside() {
      this.dissapearDropDown++;
      if(this.dissapearDropDown > 1){
        this.showDropDown = !this.showDropDown;
        this.dissapearDropDown = 0;
      }
    }
  
    sendMedia(value: any){
      this.singleMedia.title = value.title;
      this.showDropDown = false;
    }
    /* #endregion */ 


  /* #region save changes on the server */
  
    saveChangeOnServer(data: any){
      data.statusMedia = 100;
      this._mediaService.updateMedia(data)
      .subscribe(
        res =>{
          data.statusMedia = 200;
          console.log(res);
        },
        err =>{
          console.log(err);
        }
      )
    }

  /* #endregion */

}
