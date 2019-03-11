import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VotingActiveService } from '../voting-active.service';
import { GlobalsService } from '../../../../../globals/globals.service';
import { AuthService } from '../../../../login/auth/auth.service';

import swal2 from 'sweetalert2';

@Component({
  selector: 'app-poll-choices',
  templateUrl: './poll-choices.component.html',
  styleUrls: ['./poll-choices.component.scss']
})
export class PollChoicesComponent implements OnInit {
  selectedOption: any;
  options : any[] = [];
  userInfo : any = null;
  loading : boolean = false;
  haserror : boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) data, 
    private dialogRef: MatDialogRef<PollChoicesComponent>,
    private _vote : VotingActiveService,
    private _global:GlobalsService,
    private _auth : AuthService) {
    this.options = data;

    this.userInfo = this._auth.userInfo;
  }

  ngOnInit() {
   
  }
  close(){
    this.dialogRef.close()
  }
  vote(){
    this.haserror = false;
    if(!this.selectedOption){
      return false;
    }
    let data = {
      user_id : this.userInfo.user_id,
      poll_id : this.selectedOption.poll_id,
      option_id : this.selectedOption.id ,
    };
   
    this.loading = true;
    this._vote.castVote(data).subscribe((res:any) => {
      this.loading = false;
      if(res.code == 200){
        swal2({
          title : 'Vote successful!',
          text : 'Your vote was successfuly recorded!',
          type : 'success'
        })
        this.dialogRef.close();
      }
      else{
        swal2({
          title : 'Voting failed!',
          text : 'You already cast your vote for this poll!',
          type : 'error'
        });
        this.dialogRef.close()
      }
    },(err) => {
      this.loading = false;
      this.haserror = true;
    })
  }
}

