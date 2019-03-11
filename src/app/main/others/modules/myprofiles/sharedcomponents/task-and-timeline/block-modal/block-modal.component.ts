import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlockUser } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/block-modal/block-modal.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-block-modal',
  templateUrl: './block-modal.component.html',
  styleUrls: ['./block-modal.component.scss']
})
export class BlockModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BlockModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data,
    private _blockUser: BlockUser,
    private _router: Router) { 
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmBlock(){
    const params = {
      blocker_id : this._data.myInfo.user_id,
      blocked_id  : this._data.otherInfo.user_id,
      status: 1, 
    };
    this._blockUser.requestPostBlockUser(params).subscribe(response => {
        this.dialogRef.close();
        this._router.navigate(['/task/alltask']);
    });      
  }

}
