import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalsService } from '../globals.service';
import { AuthService } from '../../main/login/auth/auth.service';
import swal2 from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WizardFormComponent } from 'app/main/wizard-form/wizard-form.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _matDialog : MatDialog,
    private _global : GlobalsService, 
    private _auth : AuthService, 
    private http : HttpClient){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this._auth.redirectURL = state.url;
      this._auth.saveRoutes();

      let token = sessionStorage.getItem('token');
    
      if(!token){
        token = localStorage.getItem('token')
      }
      
      let auth = this._auth.userInfo;
      
      if(this.hasToken && auth && auth.verified == 0){
        swal2({
          title: `Your email is not yet verified!`,
          text : 'Resend verification link?',
          type : 'warning',
          showCancelButton: true,
          confirmButtonText: 'Resend verification link',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            let headers = new HttpHeaders().set('Authorization', `_bearer_token:${token}`);
            headers = headers.set('Access-Control-Allow-Headers','X-Custom-Header');
    
            return this.http.post(`${this._global.ENV.API_ENDPOINT}/profile/resend-verification`,{user_id : auth.user_id}, { headers: headers }).toPromise()
              .then((response:any) => {
                if(response.code != 200){
                  throw new Error(response.message)
                }
              })
              .catch(error => {
                swal2.showValidationError(
                  `${error}`
                )
              })
          },
          allowOutsideClick: () => !swal2.isLoading()
        }).then((result) => {
          if (result.value) {
            swal2({
              title: `Verification link sent successfuly.`,
              text : 'Please check your email address.',
              type : 'success'
            })
          }
        })
      }
      else if(this.hasToken && auth && auth.verified == 1 && auth.agreed == 0){
        // swal2({
        //   title: '<strong>HTML <u>example</u></strong>',
        //   type: 'info',
        //   html:
        //     'You can use <b>bold text</b>, ' +
        //     '<a href="//github.com">links</a> ' +
        //     'and other HTML tags',
            
        //   showCloseButton: true,
        //   showCancelButton: true,
        //   focusConfirm: false,
        //   confirmButtonText:
        //     '<i class="fa fa-thumbs-up"></i> Great!',
        //   confirmButtonAriaLabel: 'Thumbs up, great!',
        //   cancelButtonText:
        //     '<i class="fa fa-thumbs-down"></i>',
        //   cancelButtonAriaLabel: 'Thumbs down',
        // })
        this.openWizard()
       
      }
      
      return this.hasToken;
  }
  
  get hasToken() : boolean{
    let token = sessionStorage.getItem('token');
    let dummy = localStorage.getItem('token$');
    let dummysplit = [];
    let localToken =null;
    let days = null;

    if(dummy){
      dummysplit = dummy.split('@');
      localToken = dummysplit[dummysplit.length-1];
      days = Math.floor((Date.now() - localToken)/(1000*60*60*24));
    }
    
    if(!token){
      token = localStorage.getItem('token')
    }
    
    if(token === null){
      
      if(days !== null && days < 3){
        sessionStorage.setItem('token',dummysplit[0]);
        return true;
      }
      else{
        localStorage.removeItem('token$');
        this._global.ROUTER.navigate(['/auth/login'], { queryParams: { returnUrl: this._auth.redirectURL }});
      }

      return false;
    }
    return true;
    
  }
  openWizard() {
    return this._matDialog.open(WizardFormComponent, {
        disableClose : true,
        panelClass: "preview-task-dialog",
        data: {
           
        }
    });
}
}
