import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/authentication/user.service';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/services/configuration/setup.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../../tools/error-dialog/error-dialog.component';
import { User } from 'src/app/models/users/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data: any;

  user: User = {
    _id : '',
    email: '',
    user : '',
    password: '',
    publicName: '',
    statusProfile: 0
  };

  rePassword: string = '';



  constructor(
    private _userService: UserService,
    private _setup: SetupService,
    public dialog: MatDialog 
  ) { }

  ngOnInit() {
  }

  registerLocalUser(){
    if(this.user.password == this.rePassword){
      if(this.user.email != '' && this.user.user != '' && this.user.password != '' && this.rePassword != ''){
        this._userService.createUser(this.user.email,this.user.user,this.user.password,this.user.publicName)
        .subscribe(
          (res)=>{
          console.log(res);
          this.data = res;
          if(this.data.success){
            this._setup.makeLocalStorage(this.data._bodyInfo._trak_, JSON.stringify(this.data._bodyInfo));
            window.location.href = "/channel";
          }else{
            this.openErrorDialog('Ha ocurrido un error en el momento de verificar sus credenciales, la cuenta o la contraseña ya existen en la información del sitio, verifique si ya posee una cuenta con ese nombre o email, de otra forma, inténtelo más tarde. ');
          }
        },
        (err)=>{
          this.openErrorDialog('Ha ocurrido un error inesperado de parte del servidor y este no ha podido completar el proceso, inténtelo más tarde.');
        })
      }else{
        this.openErrorDialog('Antes de completar el proceso por favor rellene todos los campos obligatorios.  (Email, usuario, contraseña), el campo nombre público no es obligatorio y puede ser rellenado más tarde.');
      }
    }else{
      this.openErrorDialog('Las contraseñas ingresadas no coinciden.');
    }
  }

  openErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        DefaultMessage : message
      }
    });
  }

}
