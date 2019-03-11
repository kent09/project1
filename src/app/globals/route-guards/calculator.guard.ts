import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalsService } from 'app/globals/globals.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorGuard implements CanActivate {
  constructor(private route : Router, private _global : GlobalsService){

  }
  async canActivate(){
    let can_view = await this.isAllowed();
    
    if(!can_view['status']){
        this.route.navigate(['task/alltask'])
    }
    return can_view['status'];
  }

  isAllowed(){
    return new Promise(resolve => {
        this._global.postMethod('/membership/user-limitations', {}).subscribe((res:any) => {
            if(res.code == 200){
                let limitations = this._global.parseJwt(res.data);
                if(limitations.voting_calc_allow){
                    resolve({status : true});
                }
                else {
                    resolve({status : false})    
                }
            }
            else
                resolve({status : false})
        },(err) => {
            resolve({status : false}) 
        })

        // // this.util.getStorage('key').subscribe(res => {
        //     setTimeout(() => {
        //         let local_key = 0;
        //         if(local_key)
        //           resolve({status : true})
        //         else
        //           resolve({status : false})        
        //     }, 4000);
        

    })
  }
}
