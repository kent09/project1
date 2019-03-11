import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { TaskServiceDetails } from "app/main/task/modules/taskdetails/services/taskdetails.services";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { Router } from "@angular/router";
import { OtherTaskComponent } from "app/main/task/modules/taskdetails/modals/other-task/other-task.component";
import { PreviewTaskComponent } from "app/main/task/modules/taskdetails/modals/preview-task/preview-task.component";
import { DeactivateComponent } from "app/main/task/modules/taskdetails/modals/deactivate-task/deactivate-task.component";
import { GiftcoinComponent } from "app/main/task/modules/taskdetails/modals/giftcoin/giftcoin.component";
import { TaskCompleterComponent } from "app/main/task/modules/taskdetails/modals/completer-task/completer-task.component";
import { FollowUserComponent } from 'app/main/task/modules/taskdetails/modals/follow-user/follow-user.component';
import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';

import swal from 'sweetalert';

@Component({
    selector: "app-taskdetails",
    templateUrl: "./taskdetails.component.html",
    styleUrls: ["./taskdetails.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

    @HostListener('window:resize', ['$event'])
        onResize(event) {

        this.mobile = false;
        if(window.screen.width < 959 ) {
            this.mobile = true;
        }
    }
    
    selectedIndex : number = 0;

    taskDetails: any;
    dialogRef: any;
    component: any;
    slug: any = '';
    isfollower : boolean = false;
    ismyTask : boolean = false;
    userinfo  : any;
    mobile : boolean = false;
    isadmin : boolean = false;

    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {TaskServiceDetails} _taskDetailsService
     */
    constructor(
        private _taskDetailsService: TaskServiceDetails,
        public _matDialog: MatDialog,
        public _globals: GlobalsService,
        private _auth : AuthService,
        private router : Router
    ) {
        if(window.screen.width < 959 ) {
            this.mobile = true;
        }
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.slug = this._taskDetailsService.SlugName;
        this.userinfo = this._auth.userInfo;
        this.isadmin = (this.userinfo.type == 9);
    }

    avatarImagePath(id: any):any {
        return this._globals.avatarImagePath(id);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._taskDetailsService.taskDetailsOnChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(taskDetails => {
            this.taskDetails = taskDetails;
            this.isfollower = taskDetails.follower;
            this.ismyTask = this.taskDetails.task.user_id === this._auth.userInfo.user_id;
        });
    }

    
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Search
     *
     * @param value
     */
    taskActions(type: any): void {
        
        this.dialogRef = this.selectTypDialog(type);
        this.dialogRef.afterClosed().subscribe(response => { });
    }
    
    getTaskImg(image){
       
        return `${this._globals.ENV.TASK_IMAGE}/${image}`;
    }

    followAction(task_user_id, isfollower){
        this._taskDetailsService.followUnfollow(task_user_id).then((response : any) => {
          
            if(response.code == 200){
                this.isfollower = !isfollower;
                this._taskDetailsService.getTaskDetails(this.slug).then((response:any) => {
                   
                });
                const message = {
                    isFollow: {
                        title: 'Followed',
                        text: 'you followed'
                    },
                    isUnFollow:{
                        title: 'Unfollowed',
                        text: 'you unfollowed'
                    }
                };
                const msgType = this.isfollower ? `isFollow` : `isUnFollow`;

                swal({
                    title: message[msgType].title,
                    text: message[msgType].text + ` ${this.taskDetails.author_name}`,
                    timer: 3000,
                    icon: "success",
                });
            }
        })
    }

    selectTypDialog(type: any) {
        switch (type) {
            case "othertask":
                this.component = this.otherTask();
                break;
            case "previewtask":
                this.component = this.previewTask();
                break;
            case "deactivatetask":
                this.component = this.deactivateTask();
                break;
            case "completertask":
                this.component = this.completerTask();
                break;
            case "giftcoin":
                this.component = this.giftCoin();
                break;
            case "followusers":
                this.component = this.followUser();
                break;
            default:
                this.component = OtherTaskComponent;
        }
        return this.component;
    }

    otherTask() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = true;
        dialogConfig.panelClass = "other-task-dialog";
        dialogConfig.data = { ...this.taskDetails };
        dialogConfig.autoFocus = true;
        return this._matDialog.open(OtherTaskComponent, dialogConfig);
    }

    previewTask() {
        return this._matDialog.open(PreviewTaskComponent, {
            panelClass: "preview-task-dialog",
            data: {
                task : this.taskDetails,
                confirm: {}, // something you want to pass-on add here
                action: "edit"
            }
        });
    }

    deactivateTask() {
        return this._matDialog.open(DeactivateComponent, {
            panelClass: "preview-task-dialog",
            data: {
                confirm: {}, // something you want to pass-on add here
                action: "edit"
            }
        });
    }

    completerTask() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = true;
        dialogConfig.panelClass = "completer-task-dialog";
        dialogConfig.data = { ...this.taskDetails };
        dialogConfig.autoFocus = true;
        return this._matDialog.open(TaskCompleterComponent, dialogConfig);
    }

    giftCoin() {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = true;
        dialogConfig.panelClass = "giftcoin-task-dialog";
        dialogConfig.data = { ...this.taskDetails };
        dialogConfig.autoFocus = true;
        return this._matDialog.open(GiftcoinComponent, dialogConfig);
    }

    followUser() {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = true;
        dialogConfig.panelClass = "follow-user-dialog";
        dialogConfig.data = { ...this.taskDetails };
        dialogConfig.autoFocus = true;
        return this._matDialog.open(FollowUserComponent, dialogConfig);
    }

    apiCallHideTask() {

        swal({
            title: `Are you sure you want to hide this task?`,
            text: `${this.taskDetails.task_title}`,
            icon: `warning`,
            buttons: {
                cancel: true,
                confirm: true
            },
            dangerMode: true,
        }).then(willUnhide => {
            if (!willUnhide) throw null;
            if (willUnhide) {
                return this._taskDetailsService.requestHideTask({
                    task_id : this.taskDetails.task.id
                });
            }
        }).then(results => {
            return results.subscribe(response => {
                const { code, message, data } = response;
                if (code == 200) {
                    swal("Yes!", message, "success");
                    this.router.navigate(['/task/alltask'])
                } else {
                    const isDataMessage = data && data.length ? data.join('') : ''; 
                    swal("Oh noes!", `${message} ${isDataMessage}` , "error");
                }
            });
        }).catch(err => {
            if (err || err == '' || err == null) {
                swal({
                    title: "Cancelled!",
                    text: "cancelled unhide task.",
                    timer: 1000
                });
            } else {
                swal.stopLoading();
                swal.close('true');
            }
        });

    }
    showCompleters(){
        this.selectedIndex = 1;
    }

    updateTask(slug : string){
        let data = {slug : slug};
        this._taskDetailsService.updateTaskCategory(data).subscribe(response => {
            this.router.navigate([`/task/updatetask/${slug}`]);
        });   
        
    }
}
