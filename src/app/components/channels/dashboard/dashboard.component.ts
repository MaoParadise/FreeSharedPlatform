import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  option: string = '';

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkOption();
  }

  checkOption(){
    this.option = this.activatedRoute.snapshot.params.section;
  }

  changeLibrary(){
    this.option = 'library';
  }

  changeProfile(){
    this.option = 'profile';
  }

  changeSettings(){
    this.option = 'settings';
  }

}
