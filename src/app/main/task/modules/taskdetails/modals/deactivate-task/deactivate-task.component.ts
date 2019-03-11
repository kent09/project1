import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate-task.component.html',
  styleUrls: ['./deactivate-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class DeactivateComponent {
  /**
      * Constructor
      *
      * @param {MatDialogRef<DeactivateComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<DeactivateComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
  }
  
}

