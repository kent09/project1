import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MEMBERSHIP } from '../../globals/globals.service';
import { FuseConfigService } from '../../../@fuse/services/config.service';
import { GlobalsService } from 'app/globals/globals.service';

@Component({
  selector: 'app-membershipthankyou',
  templateUrl: './membershipthankyou.component.html',
  styleUrls: ['./membershipthankyou.component.scss']
})
export class MembershipthankyouComponent implements OnInit {

  membership: any = null;
  limit: number = 0;
  new_perks = [];

  constructor(private _fuseConfigService: FuseConfigService, private actvRoute: ActivatedRoute, private _global: GlobalsService, private router: Router) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };



    this.actvRoute.queryParams.subscribe(res => {
      if (res.token) {
        try {
          let membership = this._global.decryptAES(res.token)
          membership = JSON.parse(membership);
          this.membership = membership;
          this.limit = Math.ceil(membership.perks.length / 2);
  
          this.new_perks[0] = membership.perks.slice(0, this.limit);
          this.new_perks[1] = membership.perks.slice(this.limit);  
        } catch (error) {
          this.router.navigate(['/']);  
        }
        
      }
      else {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnInit() {

  }

}
