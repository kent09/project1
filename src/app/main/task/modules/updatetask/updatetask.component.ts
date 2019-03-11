import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { merge, Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';;
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from "@angular/router";
import { UpdateTaskService } from 'app/main/task/modules/updatetask/services/updatetask.service';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';

export interface Categories {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-update-task',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UpdateTaskComponent implements OnInit, OnDestroy {

  createTaskForm: FormGroup;
  dialogRef: any;
  taskDetails: any;
  copyFormValues: any;
  isSavingTask: boolean = false;
  referralName: string = '';
  categoryCtrl = new FormControl();
  fileChanges = new FormControl();
  filteredSocials: Observable<Categories[]>;
  fileProperty: Array<any> = [];
  tempInfoPathname: string = '';
  taskInfo: any;
  attachmentRequired: any;
  onyFollowers: any;
  reputationOption: any;
  onlyReferrals: any;
  onlyConnection: any;
  showRequirement: boolean = false;
  freeTasks: any = 0;
  origFreeTask: any = 0;
  taskFeeCharge: any = 0;
  lblTaskFeeCharge: any = 0;
  showFreetask: boolean = false;

  private _unsubscribeAll: Subject<any>;

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
      name: 'Kblog',
      icon: '/assets/svg/category/KBLOG.svg'
    }
  ];

  /**
   * Constructor
   *
  *  @param {Router} _router
  *  @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _updateTask: UpdateTaskService,
    private _locationBack: Location,
  ) {
    this._unsubscribeAll = new Subject();
    this.filteredSocials = this.categoryCtrl.valueChanges
      .pipe(
        startWith(''),
        map((Category) => Category ? this._filterSocials(Category) : this.Category.slice())
      );
  }

  backClicked() {
    this._locationBack.back();
  }

  ngOnInit(): void {

    this._updateTask.taskDetailsOnChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(taskDetails => {
        this.taskDetails = taskDetails;
        this.attachmentRequired = taskDetails.requirement_limitation.attachment_required;
        this.onyFollowers = taskDetails.requirement_limitation.only_followers;
        this.reputationOption = taskDetails.requirement_limitation.reputation_option;
        this.onlyConnection = taskDetails.requirement_limitation.only_connection;
        this.onlyReferrals = taskDetails.requirement_limitation.only_referrals;
        this.showRequirement = true;
        this.origFreeTask = taskDetails.free_tasks;
        if(this.origFreeTask > 0){
            this.showFreetask = true;
        }
        this.freeTasks = this.origFreeTask;
      });


    this.createTaskForm = this._formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskLinkURl: ['', Validators.required],
      taskImageAttach: [''],
      taskImageFile: [''],
      taskCategory: [''],
      taskReward: ['', Validators.required],
      taskCompleter: ['', Validators.required],
      taskBudget: ['', Validators.required],
      taskFeeCharge: [''],
      taskCheckAttachmentRequired: [''],
      taskCheckFollowers: [''],
      taskCheckReputationActivity: [''],
      taskCheckCanComplete: [''],
      activity_score: [''],
      reputation: [''],
      freeTaskOption: [''],
      taskCheckReferrals: [''],
    });
    
    this.populatePatchValues();
    this.onChanges();
    this.checkingTotal(this.createTaskForm);

  }

  onChanges(): void {
    this.createTaskForm.get('taskLinkURl').valueChanges.subscribe(val => {
      if(val.includes('twitter.com')){
        this.createTaskForm.controls.taskCategory.setValue('Twitter')
      }
      else if(val.includes('steemit.com')){
        this.createTaskForm.controls.taskCategory.setValue('Steemit')
      }
      else if(val.includes('instagram.com')){
        this.createTaskForm.controls.taskCategory.setValue('Instagram')
      }
      else if(val.includes('facebook.com')){
        this.createTaskForm.controls.taskCategory.setValue('Facebook')
      }
      else if(val.includes('kblog.io')){
        this.createTaskForm.controls.taskCategory.setValue('Kblog')
      }
      else if(val.includes('youtube.com')){
        this.createTaskForm.controls.taskCategory.setValue('Youtube')
      }
      else if(val.includes('telegram')){
        this.createTaskForm.controls.taskCategory.setValue('Telegram')
      }
      else {
        this.createTaskForm.controls.taskCategory.setValue('Global')
      }
    });
  }

  checkingTotal(form) {
    let remain_completer = 0;
    if (form.value.taskReward && form.value.taskCompleter) {
      if(form.value.freeTaskOption && this.showFreetask){
        if(parseInt(form.value.taskCompleter) >= parseInt(this.taskDetails.task.total_point)){
            remain_completer = parseInt(form.value.taskCompleter) - parseInt(this.taskDetails.task.total_point);
            if(remain_completer > parseInt(this.origFreeTask)){
                swal('Oops...','Total completer must not exceed to remaining total free tasks!' , 'error');
                this.createTaskForm.patchValue({ taskCompleter: parseInt(this.taskDetails.task.total_point) });
                this.freeTasks = parseInt(this.origFreeTask);
            }else{
                if(this.taskDetails.task.status == 1){
                  this.freeTasks = parseInt(this.origFreeTask) - remain_completer;
                }else{
                  this.freeTasks = parseInt(this.origFreeTask) - parseInt(form.value.taskCompleter);
                }
            }
        }
      }
      this.createTaskForm.patchValue({ taskBudget: parseInt(form.value.taskReward) * parseInt(form.value.taskCompleter) });
      if(this.taskDetails.fee_charge !== 0){
          // this.createTaskForm.patchValue({ taskFeeCharge: ((parseInt(form.value.taskReward) * parseInt(form.value.taskCompleter)) * this.taskDetails.fee_charge).toFixed(2) });
          this.lblTaskFeeCharge = ((parseInt(form.value.taskReward) * parseInt(form.value.taskCompleter)) * this.taskDetails.fee_charge).toFixed(2);
        }

    }else{
      this.createTaskForm.patchValue({ taskBudget: "" });
      this.freeTasks = this.origFreeTask;
    }
  }

  populatePatchValues() {
    let fee_charge = 0;
    let reputationOption = this.taskDetails.reputation_option;
    let reputation = (this.taskDetails.reputation_score_required && this.taskDetails.reputation_score_required[0]) == undefined ? "" : this.taskDetails.reputation_score_required[0];
    let activity_score = (this.taskDetails.activity_score_required && this.taskDetails.activity_score_required[0]) == undefined ? "" : this.taskDetails.activity_score_required[0];
    let attachment = this.taskDetails.attachment;
    let follower_option =  this.taskDetails.follower_option; 
    let connection_option = this.taskDetails.connection_option;
    let referral_option =  this.taskDetails.referral_option; 

    if(this.taskDetails.fee_charge != 0){
       this.taskFeeCharge =  this.taskDetails.fee_charge * 100;
       fee_charge = (this.taskDetails.task.total_point * this.taskDetails.task.reward) * this.taskDetails.fee_charge;
       this.lblTaskFeeCharge = fee_charge;
    }

    if(this.reputationOption == 0){
      reputationOption = false;
      reputation = null;
      activity_score = null;
    }

    if(this.attachmentRequired == 0){
        attachment = false;
    }

    if(this.onyFollowers == 0){
      follower_option = false;
    }

    if(this.onlyConnection == 0){
      connection_option = false;
    }

    this.createTaskForm.patchValue({
      taskTitle: this.taskDetails.task_title,
      taskDescription: this.taskDetails.task.description,
      taskLinkURl: this.taskDetails.task.task_link,
      taskImageAttach: this.taskDetails.task.image,
      taskCategory: this.taskDetails.task_cat_by_link,
      taskReward: this.taskDetails.task.reward,
      taskCompleter: this.taskDetails.task.total_point,
      taskBudget: this.taskDetails.task.total_point * this.taskDetails.task.reward,
      taskFeeCharge: (fee_charge).toFixed(2),
      taskCheckCanComplete: connection_option,
      taskCheckReputationActivity: reputationOption,
      taskCheckAttachmentRequired: attachment,
      taskCheckFollowers: follower_option,
      taskCheckReferrals: referral_option,
      reputation: reputation,
      activity_score: activity_score,
      freeTaskOption: this.taskDetails.task.is_free_task

    });



    this.categoryCtrl.setValue(this.taskDetails.task_cat_by_link);
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
    this.createTaskForm.patchValue({ taskImageAttach: this.fileProperty[0].name });
  }

  setFreeTaskReward(form){
    if(this.showFreetask){
        if(form.value.freeTaskOption){
            this.createTaskForm.patchValue({ taskReward: 100 });
        }else{
           this.createTaskForm.patchValue({ taskReward: "" });
        }
        this.checkingTotal(form);
    }
  }

  saveTask() {
   
    swal2({
        title: 'Rerun task?',
        text: "Do you want to rerun this task?",
        type: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, rerun it!'
    }).then((result) => {
        let is_new_task = result.value;
        if(result.value == undefined){
          is_new_task = false;
        }
        const formValues = this.createTaskForm.value;
        this.taskInfo = {
          user_id: this.taskDetails.task.user_id,
          task_id: this.taskDetails.task.id,
          title: formValues.taskTitle,
          description: formValues.taskDescription,
          task_link: formValues.taskLinkURl,
          task_category: this.trimFirstLetter(this.categoryCtrl.value),
          reward: formValues.taskReward,
          total_point: formValues.taskCompleter,
          budget: formValues.taskBudget,
          task_completion_attachment_option: formValues.taskCheckAttachmentRequired,
          follower_option: formValues.taskCheckFollowers,
          referral_option: formValues.taskCheckReferrals,
          connection_option: formValues.taskCheckCanComplete,
          reputation_option: formValues.taskCheckReputationActivity,
          activity_score: formValues.activity_score,
          reputation: formValues.reputation,
          free_task_option: formValues.freeTaskOption,
          from_wizard: null,
          image: (this.fileProperty.length > 0) ? this.fileProperty[0].format : null,
          task_image: (this.fileProperty.length > 0) ? this.fileProperty[1].binary : null,
          image_format: (this.fileProperty.length > 0) ? this.fileProperty[0].format : null,
          category: this.trimFirstLetter(this.categoryCtrl.value),
          has_attachment: formValues.taskCheckAttachmentRequired,
          is_new_task: is_new_task
        };
      
      
      if(result.value){
        this.isSavingTask = true;
        this._updateTask.requestPostUpdateTask(this.taskInfo).
        subscribe(response => {
          this.taskCreateMessage(response);
          this.isSavingTask = false;
        });
      }  
    })

  }


  taskCreateMessage(statusType) {
    let msg = "";
    if(statusType.message != ""){
       msg = statusType.message;
    }else{
       msg = statusType.data[0];
    }
    if (statusType.status === 'error') {
      swal('Oops...', msg, statusType.status);
    } else {
      swal(statusType.status, statusType.message, statusType.status);
      this.setTimer();
    }

  }

  setTimer() {
    setTimeout(() => {
      this._router.navigate(['/task/mytask']);
    }, 200);
  }

  trimFirstLetter(string) {

    return (string) ? string.charAt(0).toLowerCase() + string.slice(1) : 'global';
  }

  /**
   * On destroy
   */

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }





}
