import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
  //  MatDialog, MatDialogRef
  ],
  exports: [
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
//    MatDialogRef, MatDialog
  ]
})
export class TutoriasMaterialModule { }
