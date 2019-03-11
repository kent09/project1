import { HardUnlinkService } from './hard-unlink.service';
import { GlobalsService } from 'app/globals/globals.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-hard-unlink',
  templateUrl: './hard-unlink.component.html',
  styleUrls: ['./hard-unlink.component.scss']
})
export class HardUnlinkComponent implements OnInit {

  reason : any;


  constructor(public dialogRef: MatDialogRef<HardUnlinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _hardUnlink : HardUnlinkService,
    public _globals : GlobalsService) { }

  ngOnInit() {
  }
  submit(){
    
  }
}
