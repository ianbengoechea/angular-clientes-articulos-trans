import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatDialogModule,
} from '@angular/material';

import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDialogModule,
    SatDatepickerModule,
    SatNativeDateModule
  ]
})
export class MaterialModule { }
