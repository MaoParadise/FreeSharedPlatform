import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

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

}
