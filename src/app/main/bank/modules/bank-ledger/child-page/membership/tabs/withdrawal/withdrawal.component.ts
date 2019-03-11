import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'app/globals/globals.service';
import { MembershipWithdrawalService } from 'app/main/bank/modules/bank-ledger/child-page/membership/tabs/withdrawal/withdrawal.service';
import swal from 'sweetalert';
import { Router } from "@angular/router";

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})


export class WithdrawalComponent implements OnInit, OnDestroy {
  membershipDatabase: MembershipWithdrawalService | null;
  Memform: FormGroup;
  formErrors: any;
  hasError : any;
  withdrawalInfo: any;


  selectedValue: string;

  payment = [
    {value: 'paypal', viewValue: 'Paypal'},
    {value: 'btc', viewValue: 'BTC'},
  
  ];
  

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      private _formBuilder: FormBuilder,
      private http: HttpClient,
      private _globals: GlobalsService,
      private _membership: MembershipWithdrawalService,
      private _router: Router,
  )
  {
      // Reactive form errors
      this.formErrors = {
          amount   : {},
          payment   : {},
          paypal_email   : {},
          btc_address   : {}
      };

      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Reactive Form
      this.Memform = this._formBuilder.group({
          company   : [
              {
                  value   : 'Google',
                  disabled: true
              }, Validators.required
          ],
          payment   : ['', Validators.required],
          amount   : ['', Validators.required],
          paypal_email   : ['', Validators.required],
          btc_address   : ['', Validators.required]

          
      });

      this.Memform.valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this.onFormValuesChanged();
          });


  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On form values changed
   */
  onFormValuesChanged(): void
  {
      for ( const field in this.formErrors )
      {
          if ( !this.formErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.formErrors[field] = {};

          // Get the control
          const control = this.Memform.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.formErrors[field] = control.errors;
          }
      }
  }

  checkInput(e : any){
    this.hasError = {
      status : false,
      message : "Non numeric is not allowed!"
      }

    }

    requestWithdraw(){
        const formValues = this.Memform.value;
        this.withdrawalInfo = {
            amount: formValues.amount,
            type: formValues.payment,
            paypal_email: formValues.paypal_email,
            btc_address: formValues.btc_address
        };

        this._membership.requestWithdraw(this.withdrawalInfo).then((response: any) => {
           swal(response.status, response.message, response.status);
           if(response.code == 200){
              this.Memform.reset({
                amount: '',
                type: '',
                paypal_email: '',
                btc_address: ''
              });
               this.setTimer();
           }
        })
    }

      setTimer(){
        setTimeout(()=>{
            this._router.navigate(['/bank/bank-and-ledger/membership']);
        }, 200);
    }

  
}
