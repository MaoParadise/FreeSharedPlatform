import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GeneralService } from 'src/app/services/configuration/general.service';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements OnInit {

  references: string;
  NonedataPush: any = [];
  InvalidDataPush: any = [];
  maxData: number = 0;

  constructor(
    private http: HttpClient,
    public _general: GeneralService
  ) { }

  ngOnInit() {
  }

  add(){
    console.log(this.references);
  }

  addNoneData(noneData : any){
    for(let i = 0; i < noneData.length; i++){
      if(this._general.ItsPresent(this.NonedataPush, noneData[i])){
        
      }else{
        if(noneData[i].length > 3){
          this.NonedataPush.push(
            {
              reference : noneData[i]
            }
          )
          this.maxData++;
        }else{
          this.InvalidDataPush.push(
            {
              reference : noneData[i]
            }
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

/* #region */ 
/*   
  selectedFile: File = null;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }


  onUpload(){
    const fd = new FormData();
    fd.append('title', 'nombre xd');
    fd.append('image', this.selectedFile, this.selectedFile.name)
     this.http.post('http://192.168.0.18:3000/api/media/images/add', fd, {
       reportProgress: true,
       observe: 'events'
     }).subscribe(
       event => {
         if(event.type === HttpEventType.UploadProgress){
           console.log('Upload Progress ' + Math.round(event.loaded / event.total * 100) + ' %')
         }else if(event.type === HttpEventType.Response){
          console.log(event);
         }
       }
     );
  }
 */

/* #endregion */
}
