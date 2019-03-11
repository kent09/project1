import { Component, OnDestroy, OnInit, Input, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { TaskServiceDetails } from 'app/main/task/modules/taskdetails/services/taskdetails.services';
import { CompleteTaskComponent } from 'app/main/task/modules/taskdetails/modals/complete-task/complete-task.component';
import { AuthService } from 'app/main/login/auth/auth.service';
import { AboutService } from "app/main/task/modules/taskdetails/tabs/about/about.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareUrlComponent } from 'app/main/task/modules/taskdetails/modals/generate-url/generate-url.component';
import { LocationStrategy } from '@angular/common';
import { ImportsService } from 'app/globals/imports/imports.service';
import { GlobalsService } from 'app/globals/globals.service';
import { AttachmentViewerComponent } from '../compoleter-list/attachment-viewer/attachment-viewer.component';

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy {

    createComments: FormGroup;
    displayedColumns: string[] = ['title', 'reward'];
    about: any;
    userInfo: any;
    taskDetails: any;

    /* comment variables */
    counterComments: number = 0;
    counterCompleters: number = 0;
    listofComments: any;
    innerListofComments: any;
    replyset : any = [];
    profile_img: any;

    isLoading: boolean = false;

    dataSource = new MatTableDataSource<othertaskElement>(OTHERTASK_DATA);
    
    commentLoader = {
        counter : false,
        list : false
    }

    attachment_url : string = "";

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() requirements: any;
    @Output() showCompleter = new EventEmitter();

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: TaskServiceDetails,
        public _matDialog: MatDialog,
        private _auth: AuthService,
        private _abouts: AboutService,
        private _formBuilder: FormBuilder,
        private url: LocationStrategy,
        private _imports: ImportsService,
        public _globals: GlobalsService,
        private dialog : MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.userInfo = this._auth.userInfo;
        this.profile_img = this._imports.ENV.PROFILE_IMAGE;
        this.attachment_url = this._globals.ENV.ATTACHMENT_IMAGE;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.taskDetails = changes.requirements.currentValue;
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about
            });
        this.createComments = this._formBuilder.group({
            taskComments: ['', Validators.required],
            taskInnerComments: ['', Validators.required]
        });

        this.dataSource.paginator = this.paginator;
        this.loadComments();
        this.countComments();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    
    openModal(url){
        const dialogRef = this.dialog.open(AttachmentViewerComponent,{
            data : `${this.attachment_url}/${url}`
        });
    
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    avatarImagePath(id: any):any {
        return this._globals.avatarImagePath(id);
    }
    
    completeTask(taskData: any) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = false;
        dialogConfig.panelClass = "other-task-dialog";
        dialogConfig.data = { ...taskData };
        dialogConfig.autoFocus = true;
        return this._matDialog.open(CompleteTaskComponent, dialogConfig)
            .afterClosed().subscribe(res => {
                if (res) {
                    this.requirements.completed = true;
                }else{
                    this.requirements.completed = false;
                }
            });

    }

    loadComments() {
        this.commentLoader.list = true;
        const param = { task_id: this.taskDetails.task.id }
        this._abouts.getAllComments(param)
            .subscribe((res: any) => {
                this.commentLoader.list = false;
                if (res.data) {
                    const decodedData = this._abouts.decodeJwt(res.data);
                    this.listofComments = decodedData;
                    this.isLoadingXHR(false);
                }
            })

    }

    countComments() {
        this.commentLoader.counter = true;
        const param = { task_id: this.taskDetails.task.id }
        this._abouts.getCountComments(param)
            .subscribe((res: any) => {
            
                this.commentLoader.counter = false;
                this.counterComments = res.data.comments;
                this.counterCompleters = res.data.completers;
            })

    }

    replyInnerComment(id: number, comment: any, index: any){
        if(!comment) return;
         const param = { 
            user_id: this.userInfo.user_id, 
            comment_id: id,
            comment: comment,
        }
        this.isLoadingXHR(true);
        this._abouts.replyComments(param)
            .subscribe((res: any) => {
                this.getInnerComments(id, index);
            })
    }

    getInnerComments(comment_id, index){
        const param = { 
            task_id : this.taskDetails.task.id, 
            comment_id: comment_id,
        }
        this._abouts.getInnerComments(param)
        .subscribe((res: any) => {
            const decodedData = this._abouts.decodeJwt(res.data);
            this.isLoadingXHR(false);
            this.listofComments[index].reply = [ ...decodedData[0].reply];

        })

    }
    
    deleteComment(id){

        const param = { 
            task_comment_id  : id, 
            type: 'comment',
        }
        this._abouts.deleteComment(param)
        .subscribe((res: any) => {
            if(res.code == 200){
                const newComments =   this.listofComments.filter(comments => comments.comment_id !== id);
                this.listofComments=  newComments;
            }
        })
    }

    addComments() {
        const formValues = this.createComments.value;
        const param = {
            task_id: this.taskDetails.task.id,
            comment: formValues.taskComments,
        }
        this.isLoadingXHR(true);
        this._abouts.addComments(param)
            .subscribe((res: any) => {
                if (res.code == 200) {
                   this.loadComments();
                }
            })

    }

    isLoadingXHR(isLoading: boolean){
            this.isLoading = isLoading;
    }

    replyComment(i: any): void {
        this.listofComments[i].collapse = !this.listofComments[i].collapse;
        this.replyset[i] = '';
        const closeOther =  this.listofComments.map((collapses) => {
            if(collapses.comment_id !== this.listofComments[i].comment_id){
                collapses.collapse = false;
            }
            return collapses;
        })
        this.listofComments = closeOther;
    }

    shareLinks() {

        const angularRoute = this.url.path();
        const url = window.location.href;
        const domain = url.replace(angularRoute, '');
        
        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = true;
        dialogConfig.panelClass = "other-task-dialog";
        dialogConfig.data = {url: `${domain}/task/taskdetails/${this.taskDetails.task.slug}`} 
        dialogConfig.autoFocus = true;
        this._matDialog.open(ShareUrlComponent, dialogConfig);
    }

    
    errorHandle() {
        swal('Oops...', `SLUG task is empty\n Please contact support`, 'error');
    }

    showCompleters(){
        this.showCompleter.emit({show : true})
    }

}


export interface othertaskElement {
    title: string;
    reward: number;
}

const OTHERTASK_DATA: othertaskElement[] = [
    { title: 'Like us our FB Page', reward: 100 },
];

