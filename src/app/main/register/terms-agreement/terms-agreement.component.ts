import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'confirm',
  templateUrl: './terms-agreement.html',
  styleUrls: ['./terms-agreement.scss'],
  encapsulation: ViewEncapsulation.None
})


export class TermsAgreementComponent {
  /**
      * Constructor
      *
      * @param {MatDialogRef<TermsAgreementComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<TermsAgreementComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
  }
  
}

