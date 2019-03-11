import { Component, OnInit } from '@angular/core';
import { BankBalancesService } from '../bank_available_total.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { Router } from '@angular/router';
import { MEMBERSHIP, GlobalsService } from 'app/globals/globals.service';
import { MatDialogRef } from '@angular/material';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-voucherdialog',
  templateUrl: './voucherdialog.component.html',
  styleUrls: ['./voucherdialog.component.scss']
})
export class VoucherdialogComponent implements OnInit {
  submitVoucher = false;

  membership = MEMBERSHIP;
  sumbitVoucher: boolean = false;

  voucher: string = "";
  validVoucher: boolean = false;
  hasError: any = {
    status: false,
    message: ''
  }
  voucherError = {
    status: false,
    message: '',
    submessage: ''
  }
  codeInfo: any = null;
  loading: boolean = false;
  user : any;

  constructor(
    private dialogRef: MatDialogRef<VoucherdialogComponent>,
    private _global: GlobalsService, private _toolbar: BankBalancesService, private _auth: AuthService, private _router: Router) {
      
      this.user = this._auth.userInfo;

    }

  ngOnInit() {
  }

  checkLength(ev) {
    return this.voucher.length < 15;
  }
  checkVoucher(ev) {
    this.hasError = {
      status: false,
      message: ''
    }
    this.voucher = this.voucher.toUpperCase();
    this.validVoucher = false;
    if (ev.length < 10 || ev.length > 10) return;

    this.validVoucher = true;


    this.loading = true;
    this._toolbar.checkVoucherCode(this.voucher).subscribe(res => {
      this.loading = false;

      if (res.code == 200) {
        this.codeInfo = res.data
      }
      else {
        this.hasError = {
          status: true,
          message: res.message
        }
      }
    })
  }

  useVoucher() {
    this.submitVoucher = true;
    let membership = this.membership.filter(mem => {
      return mem.slug == this.codeInfo.role.slug
    })

    if(membership.length)
      membership = this._global.encryptAES(JSON.stringify(membership[0]));

    if (this.codeInfo.role.slug === this.user.membership) {
      swal2({
        title: 'Hold up!',
        html: `You are currently enrolled in <strong>${this.user.membership.toUpperCase()} MEMBERSHIP </strong>. This will extend your current membership plan. Continue?`,
        showCancelButton: true,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Extend it!'
      }).then((result) => {
        if (result.value) {
          this.processMembership(membership)
        }
      })
    }
    else if (this.codeInfo.role.slug !== this.user.membership && this.user.membership !== 'bronze') {

      swal2({
        title: 'Hold up!',
        html: `Are you sure you want to use this <strong>${this.codeInfo.role.slug.toUpperCase()} MEMBERSHIP VOUCHER</strong> ? This will cancel your current <strong>${this.user.membership.toUpperCase()} MEMBERSHIP</strong> plan. Continue?`,
        showCancelButton: true,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Use it!'
      }).then((result) => {
        if (result.value) {
          this.processMembership(membership)
        }
      })
    }
    else {
      this.processMembership(membership)
    }
  }
  processMembership(membership) {
    this.voucherError = {
      status: false,
      message: '',
      submessage: ''
    }
    this.sumbitVoucher = true;
    this._toolbar.useVoucherCode(this.codeInfo.code).subscribe(res => {
    
      this.sumbitVoucher = false;
      if (res.code == 200) {
        this._auth.refreshToken().subscribe(res => {
          if (res.code == 200) {
            sessionStorage.removeItem('token')

            sessionStorage.setItem('token', res.data);

            if (localStorage.getItem('token')) {
              localStorage.removeItem('token')
              localStorage.setItem('token', res.data);
            }
            else {
              localStorage.removeItem('token$');
              localStorage.setItem('token$', res.data + '@' + Date.now())
            }

          }
        })

        

        if (membership) {
          
          this.dialogRef.close();
          this._router.navigate(['/auth/purchase/thankyou'], { queryParams: { token: membership } })
        }
      }
      else if (res.code == 400) {
        if(res.message == 'Invalid Code'){
          this.voucherError = {
            status: true,
            message: 'Invalid voucher code!',
            submessage: 'OThe code may have already been used or not found.'
          }
        }
        else {
          this.voucherError = {
            status: true,
            message: 'The owner of this voucher has no GIFT MEMBERSHIP previledge.',
            submessage: 'Only vouchers given by GOLD, PLATINUM or FOUNDER members are allowed.'
          }
        }
        
      }
    }, (err) => {
      this.sumbitVoucher = false;
    })
  }

}

