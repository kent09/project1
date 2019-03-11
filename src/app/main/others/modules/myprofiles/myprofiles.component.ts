import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from 'app/main/login/auth/auth.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-myprofiles',
  templateUrl: './myprofiles.component.html',
  styleUrls: ['./myprofiles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MyProfilesComponent implements OnInit, OnDestroy {


  userStatusOptions: any[];
  userInfo: any = {};
  dialogRef: any;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {AuthService} _auth
   * @param {MatDialog} _matDialog
   */
  constructor(
    private router: Router,
    private _auth: AuthService,
    public _matDialog: MatDialog,
    private actvRoute : ActivatedRoute
  ) {
    actvRoute.params.subscribe(res => {
     if(res.username){
       localStorage.setItem('visit_username', res.username)
     }
    })
  }

  ngOnInit(): void {

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

  }


 

}
