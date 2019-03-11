import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  
  selectedIndex : number = 0;
  tabIndex : number = 0;
  addClass : boolean;

  constructor(private actvRoute : ActivatedRoute){
    actvRoute.queryParams.subscribe(res => {
      if(res.p){
        this.selectedIndex = res.p;
        this.tabIndex = res.p
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

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(this.tabIndex != tabChangeEvent.index) {
      this.addClass = true;
    } else {
      this.addClass = false;
    }
  }

}
  