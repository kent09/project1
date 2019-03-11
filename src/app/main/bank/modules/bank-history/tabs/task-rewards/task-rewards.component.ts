import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';

@Component({
  selector: 'app-task-rewards',
  templateUrl: './task-rewards.component.html',
  styleUrls: ['./task-rewards.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TaskRewardsComponent implements OnInit {

  tabBank: TabsBank[] = [
    { value: 'd-0', viewValue: 'Completion Rewards' },
    { value: 'w-1', viewValue: 'Revoke Rewards' },
    { value: 'c-2', viewValue: 'Task Withdrawal' }
  ];
  selected = 'd-0';


  constructor(
    private _globals: GlobalsService,
    private _auth: AuthService) { }

  ngOnInit() {
  }
}
export interface TabsBank {
  value: string;
  viewValue: string;
}



