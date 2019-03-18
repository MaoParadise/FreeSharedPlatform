import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users/User';
import { UserService } from 'src/app/services/authentication/user.service';
import { SetupService } from 'src/app/services/configuration/setup.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../../tools/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../tools/success-dialog/success-dialog.component';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.css']
})
export class DashProfileComponent implements OnInit {

  data: any;



  user: User = {
    _id : '',
    email: '',
    user : '',
    password: '',
    publicName: '',
    urlProfile: 'no-profile',
    statusProfile: 0
  };

  constructor(
    private _setup: SetupService,
    private _userService: UserService,
    public dialog: MatDialog 
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this._userService.getCurrentUser().subscribe(
      (res)=>{
        this.data = res;
        this.user.publicName = this.data.local._crtPU;
        this.user.email = this.data.local._email;
        this.user.urlProfile = this.data.local._crtImg;
      },
      (err)=>{
        this._setup.removeLocalStorage();
        window.location.href = "/login";
      }
    )
  }

  saveUser(){
    if(this.user.email != ''){
      this._userService.editUser(this.user.publicName, this.user.email, this.user.urlProfile)
      .subscribe(
        (res)=>{
          this.data = res;
          if(this.data.success){
            this.openSuccessDialog('Los cambios se han guardado con éxito, recuerda que si haz cambiado de email, la validación del nuevo correo es necesaria para las funciones principales de la cuenta.');
            this._setup.setCurrentImg(this.data.urlProfile);
          }else{
            if(this.data.error == 'occupied-email'){
              this.openErrorDialog('Este correo electrónico ya se encuentra siendo ocupado por otro usuario, por favor intenta con otro. ');
            }else{
              this.openErrorDialog('Ha ocurrido un error inesperado en la validación de sus datos, inténtelo mas tarde.');
            }
          }
        },
        (err)=>{
          this.openErrorDialog('Ha ocurrido un error inesperado de parte del servidor y este no ha podido completar el proceso, inténtelo más tarde.');
        }
      )
    }else{
      this.openErrorDialog('El campo email no puede quedar vacío.');
    }
  }


  openErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        DefaultMessage : message
      }
    });
  }

  openSuccessDialog(message: string): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        DefaultMessage : message
      }
    });
  }

}
