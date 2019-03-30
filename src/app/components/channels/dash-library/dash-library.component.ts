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

  actualPage: number = 1;
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
  };
  changes: boolean = false;
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
    console.log(this.dataMedia)
    this.mediaOption = 1;
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
    console.log(this.singleMedia);
    console.log(this.dataMedia[this.indexMedia]);
  }

  /* #endregion */



}
