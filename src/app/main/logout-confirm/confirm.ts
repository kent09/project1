import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.html',
  styleUrls: ['./confirm.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ConfirmComponent {
  /**
      * Constructor
      *
      * @param {MatDialogRef<ConfirmComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
  }
  
}

