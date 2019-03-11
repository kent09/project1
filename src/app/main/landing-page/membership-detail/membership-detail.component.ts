import { Component, OnInit, Inject } from '@angular/core';
import { MEMBERSHIP } from '../../../globals/globals.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.scss']
})
export class MembershipDetailComponent implements OnInit {
  
  membership = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.membership = this.data;
  }

}
