import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/models/media/Media';
import { MediaService } from 'src/app/services/media/media.service';
import { isUndefined } from 'util';
import { MediaViewService } from 'src/app/services/media/media-view.service';
import { GeneralService } from 'src/app/services/configuration/general.service';


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
    releaseDate: null,
    statusMedia: 0,
    references: []
  };


  constructor(
    private _mediaService: MediaService,
    public _mediaView: MediaViewService,
    public _general: GeneralService
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

  /* #region images process area */

  selectedFile: File = null;
  urlSelectedFile: any = '/assets/default/no-miniature.jpg';

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = this._handleReaderLoaded.bind(this);
  }

  _handleReaderLoaded(event) {
    var reader = event.target;
    this.urlSelectedFile = reader.result;
  }
 
  /* #endregion */

  /* #region add Media Region */

  formMedia = new FormData();
  errorData: boolean = false;

  saveMedia(){
    if( this.media.title == '' || 
        this.media.title == null || 
        this.media.totalEpisodes <= 0 || 
        this.media.description == '' || 
        this.media.description == null ||
        this.media.studio == '' || 
        this.media.studio == null ||
        this.media.releaseDate == null
    ){
      this.setErrorMessage('Algunos de los campos obligatorios no están rellenados o no cumplen con las especificaciones para realizar el proceso.');
      this.showErrorAlert();
      this.hideSuccessAlert();
    }else{
      if(this.selectedFile === null){
        console.log(' is null');
      }else{
        if(this.selectedFile.size > 1048576){ // max size 1 MB
          console.log(' is more size of the permitive')
        }else{
          if(this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/gif' || this.selectedFile.type === 'image/png' || this.selectedFile.type === 'image/jpg'){
            this.formMedia.append('image', this.selectedFile, this.selectedFile.name);
          }else{
            console.log(' is not a correct format')
          }
        }
      }
      this.fillFormData();
      this._mediaService.saveMedia(this.formMedia)
      .subscribe(
        res => {
          this.setSuccessMessage(`Se ha creado exitosamente el título, ahora puede encontrarlo dentro de su librería de medios. \n`+
          ` Ha completado exitosamente el paso 1, puede seguir al paso dos y agregar referencias a su título de forma que pueda facilitar la búsqueda de este a los demás usuarios y al propio algoritmo del sitio o puede cerrar la ventana y agregar las referencias en otra ocasión por medio del icono “editar información”`+
          ``);
          this.showSuccessAlert();
          this.hideErrorAlert();
          document.getElementById("step2").classList.add('active');
          this._mediaView.setStep(2);
          this.resetFormData();
          this.data = res;
          this._idMedia = this.data._id;
          console.log(this._idMedia);
        },
        err => {
          this.setErrorMessage('Ha ocurrido un error inesperado de parte del servidor, cierre la ventana y vuelva a intentarlo, si el problema persiste inténtelo mas tarde.');
          this.showErrorAlert();
          this.hideSuccessAlert();
          this._mediaView.setStep(0); 
        }
      );  
    }
  }

  fillFormData(){
    this.formMedia.append('title', this.media.title);
    this.formMedia.append('totalEpisodes',  this.media.totalEpisodes.toString());
    this.formMedia.append('description', this.media.description);
    this.formMedia.append('studio', this.media.studio);
    this.formMedia.append('releaseDate', this.media.releaseDate.toString());
  }

  resetFormData(){
    this.media.title = '';
    this.media.totalEpisodes = 0;
    this.media.description = '';
    this.media.studio = '';
    this.media.releaseDate = null;
    this.urlSelectedFile = '/assets/default/no-miniature.jpg';
    this.formMedia = new FormData();
    if(this._mediaView.getStep() == 1){
      document.getElementById("step2").classList.remove("active");
      document.getElementById("step2").classList.remove("active");
    }else if(this._mediaView.getStep() == 2){
      document.getElementById("step3").classList.remove("active");
    }
    this.NonedataPush = [];
  }



  /* #endregion */

  /* #region references region */
  _idMedia: string;
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

  saveReferences(){
    this._mediaService.pushReferences(this._idMedia, this.NonedataPush)
    .subscribe(
      res => {
        this.setSuccessMessage(`Proceso completado, desde ahora puede empezar a agregar capítulos y versiones a los títulos de su librería, intente siempre mantenerlos actualizados y evitar subir capítulos o títulos que no se han estrenados aún, (se hará una excepción para los capítulos y títulos a estrenarse a 1 semana a futuro, en caso de series y un mes a futuro, en caso de películas).`);
          this.showSuccessAlert();
          this.hideErrorAlert();
          document.getElementById("step3").classList.add('active');
          this._mediaView.setStep(3);
          this.resetFormData();
      },
      err => {
        this.setErrorMessage('Ha ocurrido un error inesperado de parte del servidor, cierre la ventana y vuelva a intentarlo, si el problema persiste inténtelo mas tarde.');
        this.showErrorAlert();
        this.hideSuccessAlert();
        this._mediaView.setStep(0); 
      }
    )
  }

  /* #endregion */



}


