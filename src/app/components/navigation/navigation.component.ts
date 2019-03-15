import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/services/configuration/setup.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  auto: boolean = this._authService.loggeInInformation();
  CurrentUser = '';
  CurrentProfileImage = '';

  constructor(
    private _authService: AuthenticationService,
    private _setup: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.CurrentUser = this._setup.getCurrentUserOrPublicName(true);
    this.CurrentProfileImage = this._setup.getCurrentImg();
  }

  logout(){
    this._authService.logoutUser().subscribe(
      (res)=>{
        this._setup.removeLocalStorage();
        window.location.href = "/channel";
      },
      (err)=>{
        this._setup.removeLocalStorage();
        window.location.href = "/login";
      }
    )
  }

}
