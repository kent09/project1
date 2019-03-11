import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from 'app/main/login/auth/auth.service';
import { SubmotRequestFormComponent } from 'app/main/others/modules/submit-request/submit-request.component';
import {Router} from "@angular/router";
import { AnnouncementDetailsService } from './announcement-details.service';
import { GlobalsService } from 'app/globals/globals.service';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AnnouncementDetailsComponent implements OnInit, OnDestroy {

  decodedData : any;
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
    private _announcement : AnnouncementDetailsService,
    private _global : GlobalsService
  ) {
    this.requestAnnouncement();
  }

  requestAnnouncement(){

    this._announcement.requestAnnouncement().subscribe(res => {
      this.decodedData = this._global.parseJwt(res.data)
    })
  }

  ngOnInit(): void {

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

  }


  /**
   * Search
   *
   * @param value
   */
  submitRequest(): void {

    this.dialogRef = this._matDialog.open(SubmotRequestFormComponent, {
      panelClass: 'submit-request-form-dialog',
      data: {
        confirm: {}, // something you want to pass-on add here
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
  
      });



  }

}
