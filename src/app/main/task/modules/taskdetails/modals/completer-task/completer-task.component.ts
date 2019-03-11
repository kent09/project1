import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-completer-task',
  templateUrl: './completer-task.component.html',
  styleUrls: ['./completer-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class TaskCompleterComponent {
  /**
      * Constructor
      *
      * @param {MatDialogRef<TaskCompleterComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<TaskCompleterComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
  }
  
}

