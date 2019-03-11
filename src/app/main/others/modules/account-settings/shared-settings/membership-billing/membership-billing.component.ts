import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Observable, merge } from 'rxjs';
import  {map, startWith} from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { GlobalsService } from 'app/globals/globals.service';
import { MembershipBillingService } from './membership-billing.service';
import { Location } from '@angular/common'
import swal2 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

export class Charge {
  constructor(public bundle: string) { }
}


@Component({
  selector: 'app-membership-billing',
  templateUrl: './membership-billing.component.html',
  styleUrls: ['./membership-billing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MembershipBillingComponent implements OnInit {

  date = Date.now();
  bundle : any = 1;
  balanceForm: FormGroup;
  myControl = new FormControl();
  subtotal : number = 0;
  discounted : number = 0;


  payLoading : boolean = false;

  membership : any = null;
  modePayment : any = 'Paypal';
  options = [
    {
      label : 'Monthly',
      month : 1
    },
    {
      label : '3 Months',
      month : 3,
    },
    {
      label : '9 Months',
      month : 9
    },
    {
      label : '1 Year',
      month : 12
    }
  ];

  filteredOptions: Observable<Charge[]>;

    /**
   * Constructor
   *
  *  @param {Router} _router
  *  @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder, 
    private _global : GlobalsService, 
    private _member : MembershipBillingService, 
    private router : Router,
    private actvRoute : ActivatedRoute,
    private location : Location) {
    }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    sessionStorage.removeItem('memb')
  }
  ngOnInit() {

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith<string | Charge>(''),
    //     map(value => typeof value === 'string' ? value : value.bundle),
    //     map(bundle => bundle ? this.filter(bundle) : this.options.slice())
    //   );

      this.balanceForm = this._formBuilder.group({
        SUPBALANCE: [''],
        BTCBALANCE: [''],
      });

      let storage = sessionStorage.getItem('memb')
      if(storage){
        this.membership = JSON.parse(this._global.decryptAES(storage))
        this.discounted = this.membership.price - (this.membership.price * this.membership.discount);
        this.subtotal = this.discounted;
      }
      
  }

  // filter(bundle: string): Charge[] {
  //   return this.options.filter(option =>
  //     option.bundle.toLowerCase().indexOf(bundle.toLowerCase()) === 0);
  // }

  displayFn(user?:Charge): string | undefined {
    return user ? user.bundle : undefined;
  }


  confirm(){
    if(!this.modePayment) {
      swal2({
        title : 'Ooops!',
        type : 'error',
        text : 'Please select your mode of payment'
      });

      return;
    }
    let data = {
      role : this.membership.slug,
      quantity : this.bundle
    }
    this.payLoading = true;
    this._member.payment(data).subscribe(res => {  
      if(res.code == 200){
        window.open(res.data.redirect_url,'_self')
      }
    },(err) => {
      this.payLoading = false;
      console.error(err)
    })
  }


  change(ev){
    this.bundle = ev.value;
    this.subtotal = this.discounted * this.bundle;
  }
}
