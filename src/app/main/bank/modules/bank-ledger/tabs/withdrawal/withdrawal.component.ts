import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-withdrawal-coin',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class WithdrawalFormComponent implements OnInit {


  withdrawalForm: FormGroup;
  isWithdrawing:boolean = false;
  
  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.withdrawalForm = this._formBuilder.group({
      receiverAddress: ['', Validators.required],
      paymentId: ['', Validators.required],
      description: ['', Validators.required],
      suppAmount: ['', Validators.required],
    });
  }
}
