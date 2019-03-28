import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-dash-library',
  templateUrl: './dash-library.component.html',
  styleUrls: ['./dash-library.component.css']
})
export class DashLibraryComponent implements OnInit {

  changes: boolean = false;
  dataMedia: any;

  constructor(
    private _mediaService: MediaService
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

}
