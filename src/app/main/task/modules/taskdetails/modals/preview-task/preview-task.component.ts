import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TaskServiceDetails } from '../../services/taskdetails.services';

@Component({
  selector: 'app-preview-task',
  templateUrl: './preview-task.component.html',
  styleUrls: ['./preview-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class PreviewTaskComponent {
  /**
      * Constructor
      *
      * @param {MatDialogRef<PreviewTaskComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */

      imagedata : any = 'https://kepriprov.go.id/assets/img/berita/No_Foto_2.jpg';

  constructor(
    private _taskdetail : TaskServiceDetails,
    public matDialogRef: MatDialogRef<PreviewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ) {
  }
  ngOnInit(): void {

    this._taskdetail.getImageMetatag(this._data.task.task.task_link).subscribe((res:any) => {
      if(res.code == 200){
        this.imagedata = res.data;
      }
    })
  
  }
  
}

