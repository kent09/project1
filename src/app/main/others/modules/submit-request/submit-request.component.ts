import { SubmitRequestService } from './submit-request.service';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.scss'],
  encapsulation: ViewEncapsulation.None
})


export class SubmotRequestFormComponent {

  requestForms: FormGroup;
  isWithdrawing: boolean = false;
  email: any
  subject : any
  message : any
  /**
      * Constructor
      *
      * @param {MatDialogRef<ConfirmComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<SubmotRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private _request : SubmitRequestService
  ) {
  }
  ngOnInit(): void {
    this.requestForms = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitRequest(){
    let data = {
      email : this.email,
      subject: this.subject,
      message: this.message
    }
    this._request.postRequest(data).subscribe(res => {
      if(res['code'] == 201){
        swal({
          title: "Success",
          text: res.message,
          icon: "success",
          dangerMode: true,
        });
        this.matDialogRef.close();
      }else{
        swal({
          title: "Error",
          text: res.message,
          icon: "error",
          dangerMode: true,
        });
      }
    })
  }
}

