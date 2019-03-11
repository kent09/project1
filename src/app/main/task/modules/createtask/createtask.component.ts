import { Component, OnDestroy, OnInit,  ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup,  Validators, FormControl } from '@angular/forms';
import { Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';;
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from "@angular/router";
import { CreateTaskService } from 'app/main/task/modules/createtask/services/createtask.service';
import swal from 'sweetalert';
import { GlobalsService } from 'app/globals/globals.service';

export interface Categories {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-create-task',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  createTaskForm: FormGroup;
  dialogRef: any;
  copyFormValues: any;
  isSavingTask: boolean = false;
  referralName: string = '';
  categoryCtrl = new FormControl();
  fileChanges = new FormControl();
  filteredSocials: Observable<Categories[]>;
  fileProperty: Array<any> = [];
  tempInfoPathname: string = '';
  taskInfo: any;
  origTaskFeeCharge: any;
  taskFeeCharge: any;
  lblTaskFeeCharge: any = 0;
  attachmentRequired: any;
  onyFollowers: any;
  reputationOption: any;
  onlyConnection: any;
  onlyReferrals: any;
  showRequirement: boolean = false;
  freeTasks: any = 0;
  origFreeTask: any = 0;
  showFreetask: boolean = false;

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
    },
    {
      name: 'Youtube',
      icon: '/assets/svg/category/youtube.svg'
    },
    {
      name: 'Telegram',
      icon: '/assets/svg/category/TELEGRAM.svg'
    },
    {
      name : 'Custom',
      icon : '/assets/images/ecommerce/product-image-placeholder.png'
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
    private _createTask: CreateTaskService,
    private _globals: GlobalsService,
  ) {
    this.filteredSocials = this.categoryCtrl.valueChanges
      .pipe(
        startWith(''),
        map((Category) => Category ? this._filterSocials(Category) : this.Category.slice())
      );
  }

  ngOnInit(): void {
    let data = {limit : 1};
    this._createTask.requestGetTaskFee(data).
      subscribe(response => {
        this.taskFeeCharge = response.data;
        this.origTaskFeeCharge = response.data * 100;
        this.lblTaskFeeCharge = 0;
        // this.createTaskForm.patchValue({ taskFeeCharge: this.taskFeeCharge });
      });

    this._createTask.requestGetFreeTasks(data).
      subscribe(response => {
          this.origFreeTask = response.data;
          if(this.origFreeTask > 0){
              this.showFreetask = true;
          }
          this.freeTasks = this.origFreeTask;
      });

    this._createTask.requestGetRequirementLimit(data).
    subscribe(response => {
        const decodedData = this._globals.parseJwt(response.data);
        this.attachmentRequired = decodedData.attachment_required;
        this.onyFollowers = decodedData.only_followers;
        this.reputationOption = decodedData.reputation_option;
        this.onlyConnection = decodedData.only_connection;
        this.onlyReferrals = decodedData.only_referrals;
        this.showRequirement = true;
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
      running_days: [5, Validators.min(2)],
    });
    this.onChanges()
  }
  
  // onChanges(): void {
  //   this.myForm.valueChanges.subscribe(val => {
  //     this.formattedMessage =
  //     `Hello,
  
  //     My name is ${val.name} and my email is ${val.email}.
  
  //     I would like to tell you that ${val.message}.`;
  //   });
  // }
  
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
    if (form.value.taskReward && form.value.taskCompleter) {
    
      if(form.value.freeTaskOption && this.showFreetask){
        if(parseInt(form.value.taskCompleter) > parseInt(this.origFreeTask)){
            swal('Oops...','Total completer must not exceed to remaining total free tasks!' , 'error');
            this.createTaskForm.patchValue({ taskCompleter: parseInt(this.origFreeTask) });
            this.freeTasks = 0;
        }else{
            this.freeTasks = parseInt(this.origFreeTask) - parseInt(form.value.taskCompleter);
        }
      }

      this.createTaskForm.patchValue({ taskBudget: parseInt(form.value.taskReward) * parseInt(form.value.taskCompleter) });
      if(this.taskFeeCharge !== 0){
        this.lblTaskFeeCharge = ((parseInt(form.value.taskReward) * parseInt(form.value.taskCompleter)) * this.taskFeeCharge).toFixed(2);
        // this.createTaskForm.patchValue({ taskFeeCharge: ((parseInt(form.value.taskReward) * parseInt(form.value.taskCompleter)) * this.taskFeeCharge).toFixed(2) });
      }
      
    }else{
      this.createTaskForm.patchValue({ taskBudget: "" });
      this.freeTasks = this.origFreeTask;
      this.lblTaskFeeCharge = 0;
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
    const formValues = this.createTaskForm.value;
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
      referral_option: formValues.taskCheckReferrals,
      connection_option: formValues.taskCheckCanComplete,
      reputation_option: formValues.taskCheckReputationActivity,
      activity_score: formValues.activity_score,
      reputation: formValues.reputation,
      free_task_option: formValues.freeTaskOption,
      running_days: formValues.running_days,
      from_wizard: null,
      image : (this.fileProperty.length > 0) ? this.fileProperty[0].format : null,
      task_image: (this.fileProperty.length > 0) ? this.fileProperty[1].binary : null,
      image_format: (this.fileProperty.length > 0) ? this.fileProperty[0].format : null
    };
    this.isSavingTask = true;
    this._createTask.requestPostCreateTask(this.taskInfo).
      subscribe(response => {
        this.taskCreateMessage(response);
        this.isSavingTask = false;
        // this.createTaskForm.reset();
      });
  }


  taskCreateMessage(statusType) {
    let msg = "";
    if(statusType.message != ""){
       msg = statusType.message;
    }else{
       msg = statusType.data[0];
    }
    if (statusType.status === 'error') {
      swal('Oops...', msg , statusType.status);
    }else {
      swal(statusType.status, statusType.message, statusType.status);
      this.setTimer();
    } 

  }

  setTimer(){
    setTimeout(()=>{
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
  }






}
