import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/models/media/Media';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})

export class AddMediaComponent implements OnInit {

  data: any;
  dataSearch: any;

  media: Media = {
    _idUser: '',
    title: '',
    description: '',
    totalEpisodes: 0,
    studio: '',
    miniature: '',
    releaseDate: new Date(),
    statusMedia: 0,
    references: []
  };


  constructor(
    private _mediaService: MediaService
  ) { }

  ngOnInit() {
  }

  /* #region messages area */
  messageSuccess = '';
  messageError = '';

  setErrorMessage(message: string){
    this.messageError = message;
  }
  setSuccessMessage(message: string){
    this.messageSuccess = message;
  }
  showErrorAlert(){
    document.querySelector('.alert-danger').setAttribute('style',`display: block`);
  }
  hideErrorAlert(){
    document.querySelector('.alert-danger').setAttribute('style',`display: none`);
  }
  showSuccessAlert(){
    document.querySelector('.alert-success').setAttribute('style',`display: block`);
  }
  hideSuccessAlert(){
    document.querySelector('.alert-success').setAttribute('style',`display: none`);
  }
  /* #endregion */  

  /* #region title-search area */ 

  showDropDown = false;
  dissapearDropDown:number = 0;

  onChangeSearch(){
      if(this.media.title.length > 3){
        this._mediaService.getMediaLike(this.media.title).subscribe(
          res =>{
           this.dataSearch = res;
           console.log(this.dataSearch);
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
    this.media.title = value.title;
    this.showDropDown = false;
    this.hideErrorAlert();
  }
  /* #endregion */ 

}
