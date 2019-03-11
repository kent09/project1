import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { MatTabChangeEvent } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bank-ledger',
  templateUrl: './bankledger.component.html',
  styleUrls: ['./bankledger.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BankLedgerComponent implements OnInit, OnDestroy {


  indexTabs: number = 0;
  indexTabsEqualValues: any = {
    SUPER_COIN: 0,
    BITCOIN: 1,
    WITHDRAWAL: 2,
    MEMBERSHIP: 3,
  };
  routerEvents : any;
  type: string;

  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router) {

    this._unsubscribeAll = new Subject();
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      takeUntil(this._unsubscribeAll)
    ).subscribe(res => {
      this.routerEvents = res;
      if (this.routerEvents.url) {
        this.type = this.routerEvents.url.split("/")[3];
      }
    });

  }


  ngOnInit(): void {

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onLinkClick(event: MatTabChangeEvent) {
    this.indexTabs = event.index;
  }

}
