import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../@fuse/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from 'app/globals/globals.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  email : string = null;
  token : string = null;

  constructor(private _fuseConfigService: FuseConfigService, private actvRoute : ActivatedRoute, private _global : GlobalsService, private router : Router) {
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
      if(res.token){
        this.email = this._global.decryptAES(res.token);
      }
     
      if(!this.email || this.email.length == 0){
        this.router.navigate(['/'])
      }
    })

  }

  ngOnInit() {
  }

}
