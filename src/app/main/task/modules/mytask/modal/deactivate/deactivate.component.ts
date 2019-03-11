import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeactivateTask } from 'app/main/task/modules/mytask/modal/deactivate/deactivate.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.scss']
})
export class DeactivateComponent {

  dialogActionType = {
    d: { message: 'INACTIVE', urlType: 'deactivate'},
    a: { message: 'ACTIVATE', urlType: 'activate'}
  }
  messageDialog: string = '';

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
    private _dOrAtivateTask: DeactivateTask,
  ) {
    this.messageDialog = this.dialogActionType[this._data.type].message;
  }

  deORactivateTask() {
    const { user_id, task_id } = this._data.taskData;
    const dataParam = {
      type: this.dialogActionType[this._data.type].urlType,
      params: {
        user_id: user_id, task_id: task_id
      }
    };
    this._dOrAtivateTask.requestDeORActivateTask(dataParam)
      .then((response: any) => {
        const { code, message, data } = response;
        if (code == 200) {
          let slug = {slug : this._data.taskData.slug};
          this._dOrAtivateTask.updateTaskCategory(slug).subscribe(response => {
            this.matDialogRef.close(true);
            swal("Yes!", message, "success");
          });       
          
        } else {
          
          const isDataMessage = data && data.length ? data.join('') : '';
          swal("Oh noes!", `${message} ${isDataMessage}`, "error");
          this.matDialogRef.close(false);
        }
        
      })
  }

}
