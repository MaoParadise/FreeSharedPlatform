import {MatButtonModule, MatSnackBarModule, MatDialogModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatDialogModule],
  exports: [MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatDialogModule],
})
export class MaterialModule { }