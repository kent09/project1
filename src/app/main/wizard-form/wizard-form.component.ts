import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {
  MatDialog, MatDialogRef,
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from "@angular/router";
import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from '../../globals/globals.service';
import Swal from 'sweetalert2';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { CreateTaskService } from 'app/main/task/modules/createtask/services/createtask.service';
import { MatStepper } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { FacebookLoginProvider, AuthService as FBService, LinkedInLoginProvider } from 'angularx-social-login';
import swal2 from 'sweetalert2';
import { LocationStrategy } from '@angular/common';

export interface Categories {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-wizard-form',
  templateUrl: './wizard-form.component.html',
  styleUrls: ['./wizard-form.component.scss'],
  animations: fuseAnimations
})
export class WizardFormComponent implements OnInit {
  loginForm: FormGroup;
  dialogRef: any;
  isLogin: boolean = false;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  form: FormGroup;
  formErrors: any;
  socialBtn: string = '';
  copyFormValues: any;
  isSavingTask: boolean = false;
  referralName: string = '';
  categoryCtrl = new FormControl();
  fileChanges = new FormControl();
  filteredSocials: Observable<Categories[]>;
  fileProperty: Array<any> = [];
  tempInfoPathname: string = '';
  taskInfo: any;

  isFacebookLoggingIn: boolean = false;


  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep1Errors: any;
  horizontalStepperStep2Errors: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  Category: Categories[] = [
    {
      name: 'Global',
      icon: '/assets/svg/category/WORLD.svg'
    },
    {
      name: 'Steemit',
      icon: '/assets/svg/category/STEEMIT.svg'
    },
    {
      name: 'Twitter',
      icon: '/assets/svg/category/TWITTER.svg'
    },
    {
      name: 'Instagram',
      icon: '/assets/svg/category/INSTAGRAM.svg'
    },
    {
      name: 'Facebook',
      icon: '/assets/svg/category/FACEBOOK.svg'
    },
    {
      name: 'Google Plus',
      icon: '/assets/svg/category/GOOGLE.svg'
    }
  ];



  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   * @param {Router} router
   * @param {MatDialog} _matDialog
   * @param {AuthService} _auth
   * @param {GlobalsService} _global
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public _matDialog: MatDialog,
    private _auth: AuthService,
    private _global: GlobalsService,
    public snackBar: MatSnackBar,
    private _createTask: CreateTaskService,
    private socialAuthService : FBService,
    private loc : LocationStrategy
  ) {
    this.filteredSocials = this.categoryCtrl.valueChanges
      .pipe(
        startWith(''),
        map((Category) => Category ? this._filterSocials(Category) : this.Category.slice())
      );
    // Configure the layout
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

    // Reactive form errors
    this.formErrors = {
      social: {},
      taskTitle: {},
      taskDescription: {},
      taskLinkURl: {},
      taskImageAttach: {},
      taskImageFile: {},
      taskCategory: {},
      taskReward: {},
      taskCompleter: {},
      taskBudget: {},
      taskCheckAttachmentRequired: {},
      taskCheckFollowers: {},
      taskCheckReputationActivity: {},
      taskCheckCanComplete: {},
      activity_score: {},
      reputation: {},
    };

    // Horizontal Stepper form error
    this.horizontalStepperStep1Errors = {
      social: {},
    };

    this.horizontalStepperStep2Errors = {
      taskTitle: {},
      taskDescription: {},
      taskLinkURl: {},
      taskImageAttach: {},
      taskImageFile: {},
      taskCategory: {},
      taskReward: {},
      taskCompleter: {},
      taskBudget: {},
      taskCheckAttachmentRequired: {},
      taskCheckFollowers: {},
      taskCheckReputationActivity: {},
      taskCheckCanComplete: {},
      activity_score: {},
      reputation: {},
    };

    this._unsubscribeAll = new Subject();
    // this.loadVisJsScript();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      social: ['', Validators.required],
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskLinkURl: ['', Validators.required],
      taskImageAttach: ['', Validators.required],
      taskImageFile: ['', Validators.required],
      taskCategory: [''],
      taskReward: ['', Validators.required],
      taskCompleter: ['', Validators.required],
      taskBudget: ['', Validators.required],
      taskCheckAttachmentRequired: [''],
      taskCheckFollowers: [''],
      taskCheckReputationActivity: [''],
      taskCheckCanComplete: [''],
      activity_score: [''],
      reputation: [''],

    });


    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });


    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this._formBuilder.group({
      social: ['', Validators.required],
    });

    this.horizontalStepperStep2 = this._formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskLinkURl: ['', Validators.required],
      taskImageAttach: ['', Validators.required],
      taskImageFile: ['', Validators.required],
      taskCategory: [''],
      taskReward: ['', Validators.required],
      taskCompleter: ['', Validators.required],
      taskBudget: ['', Validators.required],
      taskCheckAttachmentRequired: [''],
      taskCheckFollowers: [''],
      taskCheckReputationActivity: [''],
      taskCheckCanComplete: [''],
      activity_score: [''],
      reputation: [''],
    });

    this.horizontalStepperStep1.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

    this.horizontalStepperStep2.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });

  }

  public facebookLogin() {
    let user = this._auth.userInfo;
   
    let socialPlatformProvider;
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.isFacebookLoggingIn = true;
    this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
            let data = {
              user_id : user.user_id,
              social : 'facebook',
              account_id : userData.id,
              account_name : userData.name
            };
            
            this._auth.connectSocial(data).subscribe((res:any) => {
              this.isFacebookLoggingIn = false;
              if(res.code == 200){
                sessionStorage.setItem('token', res.data);
                localStorage.setItem('token$',res.data+'@'+Date.now())
                
                this.router.navigate(['/task'])
                this._matDialog.closeAll();

                swal2({
                  title : 'Success!',
                  text : 'Facebook account successfuly linked to this user',
                  type : 'success'
                });
                
              }
              else {
                swal2({
                  title : 'Fail!',
                  text : res.message,
                  type : 'error'
                });
              }
            },(err) => {
              this.isFacebookLoggingIn = false;
            })
        }

    ).catch(err => {
      this.isFacebookLoggingIn = false
    });
}

public linkedin(){
  let user = this._auth.userInfo;
   
  let socialPlatformProvider;
  socialPlatformProvider = LinkedInLoginProvider.PROVIDER_ID;
  this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
    if(userData){
      let data = {
        user_id : user.user_id,
        social : 'linkedin',
        account_id : `https://linkedin/in/${userData.firstName}-${userData.lastName}/`,
        account_name : userData.name
      };

      this._auth.connectSocial(data).subscribe((res:any) => {
        this.isFacebookLoggingIn = false;
        if(res.code == 200){
          sessionStorage.setItem('token', res.data);
          localStorage.setItem('token$',res.data+'@'+Date.now())
          
          this.router.navigate(['/task'])
          this._matDialog.closeAll();

          swal2({
            title : 'Success!',
            text : 'Linked account successfuly linked to this user',
            type : 'success'
          });
          
        }
        else {
          swal2({
            title : 'Fail!',
            text : res.message,
            type : 'error'
          });
        }
      },(err) => {
        this.isFacebookLoggingIn = false;
      })
    }
  })
}
   
  patchValueSocial(social: any) {
    this.socialBtn = social;
    this.horizontalStepperStep1.patchValue({ social: social });
  }

  nextStep() {
    if(!this.socialBtn) return;
    if(this.socialBtn == 'facebook'){
        this.facebookLogin();
    }
    else if(this.socialBtn == 'linkedin')
      this.linkedin()
      

    // if (!this.horizontalStepperStep1.value.social) {
    //   this.snackBar.open('Please select one of your social connect.', 'close', {
    //     duration: 1500,
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //   });
    // }
  }


  finishWizardStepper(): void {

  }
  close(){
    let path = this.loc.path();
    this.router.navigate([path])
    this._matDialog.closeAll()
  }


  /**
   * On form values changed
   */
  onFormValuesChanged(): void {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  checkingTotal(form) {
    if (form.value.taskReward && form.value.taskCompleter) {
      this.horizontalStepperStep2.patchValue({ taskBudget: parseInt(form.value.taskReward) * parseInt(form.value.taskCompleter) });
    }
  }

  private _filterSocials(value: string): Categories[] {
    const filterValue = value.toLowerCase();
    return this.Category.filter(catergory => catergory.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onFileChanged(ev) {
    this.fileProperty = [];
    let selectedFile = <File>ev.target.files[0];
    this.fileProperty.push({
      name: selectedFile.name,
      format: selectedFile.type.split("/")[1]
    });
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(selectedFile);

  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let binaryImage = 'data:image/jpeg;base64,' + btoa(binaryString);
    this.fileProperty.push({ binary: binaryImage });
    this.horizontalStepperStep2.patchValue({ taskImageAttach: this.fileProperty[0].name });
  }

  saveTask(stepper: MatStepper) {

    const formValues = this.horizontalStepperStep2.value;
    this.taskInfo = {
      title: formValues.taskTitle,
      description: formValues.taskDescription,
      task_link: formValues.taskLinkURl,
      task_category: this.trimFirstLetter(this.categoryCtrl.value),
      reward: formValues.taskReward,
      total_completer: formValues.taskCompleter,
      budget: formValues.taskBudget,
      task_completion_attachment_option: formValues.taskCheckAttachmentRequired,
      follower_option: formValues.taskCheckFollowers,
      connection_option: formValues.taskCheckCanComplete,
      reputation_option: formValues.taskCheckReputationActivity,
      activity_score: formValues.activity_score,
      reputation: formValues.reputation,
      from_wizard: null,
      task_image: this.fileProperty[1].binary,
      image_format: this.fileProperty[0].format
    };
    this.isSavingTask = true;
    this._createTask.requestPostCreateTask(this.taskInfo).
      subscribe(response => {
        this.taskCreateMessage(response);
        this.isSavingTask = false;
        stepper.next();

      });
  }


  taskCreateMessage(statusType) {
    if (statusType.status === 'error') {
      Swal('Oops...', statusType.message, statusType.status);
    }

  }


  trimFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  loadVisJsScript() {

    let link = document.createElement("link");
    link.type = "stylesheet";
    link.href = "https://use.fontawesome.com/releases/v5.2.0/css/all.css";
    link.integrity = "sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ";
    document.getElementsByTagName('head')[0].appendChild(link);
  }


}
