import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalsService } from '../../../../globals/globals.service';

@Injectable()
export class FaqService implements Resolve<any>
{
    knowledgeBase: any;
    onKnowledgeBaseChanged: BehaviorSubject<any>;

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
        this.onKnowledgeBaseChanged = new BehaviorSubject({});
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
                this.getKnowledgeBase()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get knowledge base
     */
    getKnowledgeBase(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/knowledge-base')
                .subscribe((response: any) => {
                    this.knowledgeBase = response;
                    this.onKnowledgeBaseChanged.next(this.knowledgeBase);
                    resolve(this.knowledgeBase);
                }, reject);
        });
    }
    requestFaq(data:any){
        return this._globals.postMethod('/manager/faqs/',data);
      }
}
