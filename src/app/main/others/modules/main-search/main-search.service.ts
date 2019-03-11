import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalsService } from '../../../../globals/globals.service';


@Injectable({
  providedIn: 'root'
})
export class MainSearchService implements Resolve<any>
{
    classic: any;


    classicOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _globals : GlobalsService
    )
    {
        // Set the defaults
        this.classicOnChanged = new BehaviorSubject({});

    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getClassic(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get classic
     */
    getClassic(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/search-classic')
                .subscribe((classic: any) => {
                    this.classic = classic;
                    this.classicOnChanged.next(this.classic);
                    resolve(this.classic);
                }, reject);
        });
    }

    requestSearchMemberResponse(data : any){
        return this._globals.postMethod(`/user/member-search`,data).pipe(
          map(response => <any>response)
        );
      }
}
