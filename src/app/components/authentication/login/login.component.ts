import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SetupService } from 'src/app/services/configuration/setup.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../../tools/error-dialog/error-dialog.component';
import { User } from 'src/app/models/users/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: any;

  user: User = {
    _id : '',
    email: '',
    user : '',
    password: '',
    statusProfile: 0
  };

  password: string = '';

  constructor(
    private _auth: AuthenticationService,
    private _setup: SetupService,
    public dialog: MatDialog 
  ) { }

  ngOnInit() {
  }

  verifyUser()
  {
    this._auth.checkUser(this.user.email, this.user.password, false)
    .subscribe(
      (res)=>{
        this.data = res;
        if(this.data.success){
          this._setup.makeLocalStorage(this.data._bodyInfo._trak_, JSON.stringify(this.data._bodyInfo));
          window.location.href = "/channel";
        }else{
          this.openErrorDialog('Ha ocurrido un error en el momento de verificar sus credenciales, la cuenta o la contraseña no coinciden con la información existente, verifique que haya ingresado información valida, de lo contrario, inténtelo más tardes. Si cree que los datos que ingreso no existen, vaya al apartado de registro para asociar una cuenta.');
        }
      },
      (err)=>{
        this.openErrorDialog('Ha ocurrido un error inesperado de parte del servidor y este no ha podido completar el proceso, inténtelo más tarde.');
      }
    )
  }


  openErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        DefaultMessage : message
      }
    });
  }


}
