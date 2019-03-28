import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-library',
  templateUrl: './dash-library.component.html',
  styleUrls: ['./dash-library.component.css']
})
export class DashLibraryComponent implements OnInit {

  changes: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
