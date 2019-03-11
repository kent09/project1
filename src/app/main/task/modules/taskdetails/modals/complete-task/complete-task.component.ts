import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';

import { CompleteService } from 'app/main/task/modules/taskdetails/modals/complete-task/complete-service-task/complete-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.component.html',
  styleUrls: ['./complete-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class CompleteTaskComponent {

  createTaskForm: FormGroup;
  fileChanges = new FormControl();
  dialogRef: any;
  copyFormValues: any;
  taskInfo: any;
  taskHasAttachement: any;
  checkingCode: boolean = false;
  referralName: string = '';
  fileProperty: Array<any> = [];
  isSavingTask: boolean = false;
  filename : string = "";

  /**
      * Constructor
      *
      * @param {MatDialogRef<TaskCompleterComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<CompleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _completeTask: CompleteService,
    private _formBuilder: FormBuilder,
  ) {
    this.taskHasAttachement = this._data.attachment;
  }

  ngOnInit(): void {
    this.createTaskForm = this._formBuilder.group({
      taskImageAttach: ['', Validators.required],
      taskImageFile: ['', Validators.required],
      taskCheckAttachmentRequired: [''],
    });
   

  }

  onFileChanged(ev) {
    this.fileProperty = [];
    let selectedFile = <File>ev.target.files[0];
    this.fileProperty.push({
      name: selectedFile.name,
      format: selectedFile.type.split("/")[1]
    });
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(selectedFile);

  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let binaryImage = 'data:image/jpeg;base64,' + btoa(binaryString);
    this.fileProperty.push({ binary: binaryImage });
    this.filename = Date.now() +'-'+ this.fileProperty[0].name;
    this.createTaskForm.patchValue({ taskImageAttach: this.filename });
  }

  saveTaskHasAttachment() {

    this.taskInfo = {
      task_id: this._data.task.id,
      id: this._data.task.user_id,
      attachment: this.fileProperty[1].binary,
      has_attachment: this._data.attachment,
      format: this.fileProperty[0].format,
      filename : this.filename
    };
    this._API_saveTaskRequest(this.taskInfo);

  }

  saveTaskNoAttachment() {

    this.taskInfo = {
      task_id: this._data.task.id,
      id: this._data.task.user_id,
      has_attachment: false,
    };
    this._API_saveTaskRequest(this.taskInfo);

  }


  _API_saveTaskRequest(taskInfo: any): void {
    
    this.isSavingTask = true;
    window.open(this._data.task.task_link,'_blank');
    this._completeTask.requestPostCompleteTask(taskInfo).
      subscribe(response => {
        this.taskCompleteMessage(response);
        this.isSavingTask = false;
      });
  }

  

  taskCompleteMessage(statusType) {
   const temp = [];
   
    const appendingMessage = Array.isArray(statusType.data) ? statusType.data : ['api does not work messages correctly'];
    for (let entry of appendingMessage) {
      const isExist =  entry.hasOwnProperty('follower') || 
                       entry.hasOwnProperty('reputation') ||
                       entry.hasOwnProperty('activity') || 
                       entry.hasOwnProperty('connection') || 
                       entry.hasOwnProperty('hidden');
      if(isExist){
     
        temp.push(entry.follower);
        temp.push(entry.reputation);
        temp.push(entry.activity);
        temp.push(entry.connection);
        temp.push(entry.hidden);
      }else{
        temp.push(entry);
      }
    }
    if (statusType.status === 'error') {
    
      const checkKeyPair =  temp.filter((item) => {
        return (item !== ' ' || item !== undefined) ? item : [];
    });
      this.matDialogRef.close(false);
      swal(statusType.status, statusType.message + '\n' + `${checkKeyPair.join('\n')}`, statusType.status);
    } else {
      this.matDialogRef.close(true);
      swal(statusType.status, statusType.message, statusType.status);
    }

  }

}

