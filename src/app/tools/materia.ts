import {MatButtonModule, MatSnackBarModule, MatDialogModule, MatDatepickerModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatSnackBarModule, MatDialogModule, MatDatepickerModule],
  exports: [MatButtonModule, MatSnackBarModule, MatDialogModule, MatDatepickerModule],
})
export class MaterialModule { }