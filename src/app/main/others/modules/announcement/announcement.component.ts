import { AnnouncementService } from './announcement.service';
import { GlobalsService } from 'app/globals/globals.service';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-bank-ledger',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  decodedData : any;
  myDate = new Date();
  filter_date = null;
  constructor(private _global : GlobalsService,
              private _annnouncement : AnnouncementService){
               
  }

  requestAnnouncement(){
    let data = {
      limit : 10,
      filter_date : this.filter_date
    }
    this._annnouncement.requestAnnouncement(data).subscribe(res => {
      if(res['code'] == 201){
        this.decodedData = this._global.parseJwt(res.data)
      }else{
        this.decodedData = []
      }
    })
  }

  events: string[] = [];
  addEvent(event) {
    if(event){
      let exo = `${event['_i']['year']}-${event['_i']['month']+1}-${event['_i']['date']}`;
      this.filter_date = exo;
    }else{
      this.filter_date = null;
    }

    this.ngOnInit()
    return this.filter_date;

  }

  ngOnInit(): void {
    this.requestAnnouncement();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

  }

}
