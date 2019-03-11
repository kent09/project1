import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'app/globals/globals.service';
import { HeaderMembershipDataService } from 'app/main/bank/modules/bank-ledger/header-membership-data/header-membership-data.service';

@Component({
  selector: 'app-header-membership-data',
  templateUrl: './header-membership-data.component.html',
  styleUrls: ['./header-membership-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class HeaderMembershipDataComponent implements OnInit {

  membershipDatabase: HeaderMembershipDataService | null;
  available: any = 0;
  paid: any = 0;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _membership: HeaderMembershipDataService) {
       
   }

  ngOnInit() {
    let data = {limit : 10};
    this._membership.getBalance(data).then((response: any) => {
      const balance = this._globals.parseJwt(response.data);
      this.available = (balance.available=="") ? 0 : balance.available;
      this.paid = (balance.total=="") ? 0 : balance.total;
      
    })
  }

}
