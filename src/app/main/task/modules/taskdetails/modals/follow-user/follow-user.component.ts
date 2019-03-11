import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FollowService  } from './follow-user.service';
import { AuthService } from 'app/main/login/auth/auth.service';
@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class FollowUserComponent {
  
  userInfo: any;
  followUserInfo: any;
  isSavingTask: boolean = false;

  /**
      * Constructor
      *
      * @param {MatDialogRef<DeactivateComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<FollowUserComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _auth: AuthService,
    private _userFollow: FollowService,
  ) {

    this.userInfo = this._data;
  }
  
  followUser() {

    this.followUserInfo = {
      follower_id : this.userInfo.task.user_id,
      followed_id : this._auth.userInfo.user_id,
      status  : '0',
    };
    this.isSavingTask = true;
    this._userFollow.requestPostFollowUsers(this.followUserInfo).
      subscribe(response => {
        this.followUserMessage(response);
        this.isSavingTask = false;
      });
  }

  followUserMessage(statusType) {
    const conditionType = statusType.status === 'error' || statusType.code ===  400;
    if (conditionType) {
      swal('Oops...', statusType.message, 'error');
    }else {
      swal(statusType.status, `You succesfully followed ${this.userInfo.author_name}`, 'success');
      // this.setTimer();
    } 
    this.matDialogRef.close(true);

  }
  
}

