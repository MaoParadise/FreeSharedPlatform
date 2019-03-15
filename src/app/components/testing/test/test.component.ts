import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/authentication/user.service';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/services/configuration/setup.service';

// necesarios para un dialog en otro componente...
import { MatDialog } from '@angular/material';
import { DefaultDialogComponent } from '../../tools/default-dialog/default-dialog.component';
import { ErrorDialogComponent } from '../../tools/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../tools/success-dialog/success-dialog.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  information: string = '';

  constructor(
    private _setup: SetupService,
    private _userService: UserService,
    private router: Router,
    public dialog: MatDialog // tambien esto 
  ) { }

  
  ngOnInit() {
   this._setup.validateCredentials();

    // this.information = JSON.parse(localStorage.getItem('-bdI-'))._email;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
      data: {
        DefaultMessage : "MENSAJE !!!!! "
      }
    });
  }

  openErrorDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        DefaultMessage : `Tempor in deserunt sit excepteur in labore. Cupidatat velit nostrud aute minim. Cillum magna ex fugiat nulla anim do cupidatat. Quis sint ullamco nulla ea ad sint ullamco. Officia ad ullamco cillum sit ad adipisicing dolore eiusmod incididunt culpa anim quis.`
      }
    });
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        DefaultMessage : "Velit aliqua pariatur sint consequat anim. Officia velit commodo commodo cillum amet ad sit ea ea dolor mollit. Voluptate culpa irure do voluptate qui aute. Tempor nulla ipsum nulla do duis aute ipsum labore veniam. Sunt tempor nisi elit qui cupidatat eu pariatur aliquip cillum culpa pariatur nulla exercitation."
      }
    });
  }


}
