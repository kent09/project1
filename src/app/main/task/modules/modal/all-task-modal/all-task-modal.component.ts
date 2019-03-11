import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-all-task-modal',
  templateUrl: './all-task-modal.component.html',
  styleUrls: ['./all-task-modal.component.scss']
})
export class AllTaskModalComponent implements OnInit{
  taskdetail: any;
  constructor( 
    public dialogRef: MatDialogRef<AllTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.taskdetail = this.data.taskData;
  }

  splitdata(data: any): any{
    let dataAny = '';
    if(data){
        const split = data.split(',');
        dataAny = split;
    }
    return dataAny;
  }

}
