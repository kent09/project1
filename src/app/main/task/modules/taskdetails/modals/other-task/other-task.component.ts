import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-other-task',
  templateUrl: './other-task.component.html',
  styleUrls: ['./other-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class OtherTaskComponent {

  taskDetails:any;
  /**
      * Constructor
      *
      * @param {MatDialogRef<OtherTaskComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<OtherTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
      if(this._data.hasOwnProperty('other_task')){
        this.taskDetails = this._data.other_task;
      }
  }
  
}

