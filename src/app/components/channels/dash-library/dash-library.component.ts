import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { MediaViewService } from 'src/app/services/media/media-view.service';

@Component({
  selector: 'app-dash-library',
  templateUrl: './dash-library.component.html',
  styleUrls: ['./dash-library.component.css']
})
export class DashLibraryComponent implements OnInit {

  changes: boolean = false;
  dataMedia: any;

  constructor(
    private _mediaService: MediaService,
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

}
