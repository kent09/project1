import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalsService } from 'app/globals/globals.service';
import { map } from 'rxjs/operators';

export interface Response {
    status: string;
    code: number;
    data: string;
    message: any;
  }

  
  
@Injectable()
export class TaskServiceDetails implements Resolve<any>
{
    timeline: any;
    taskDetails: any;
    about: any;
    photosVideos: any;
    slugParams: string;

    taskDetailsOnChanged: BehaviorSubject<any>;
    timelineOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {ActivatedRoute} _actvRoute
     */
    constructor(
        private _httpClient: HttpClient,
        private _globals: GlobalsService,
    ) {
        // Set the defaults
        this.taskDetailsOnChanged = new BehaviorSubject({});
        this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.slugParams = route.params['slug'];
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTimeline(),
                this.getAbout(),
                this.getPhotosVideos(),
                this.getTaskDetails(route.params['slug']),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    get SlugName(): string {
        return this.slugParams;
    }

    getImageMetatag(link : string){
        return this._globals.postMethod(`/task/task-link-image-tag`, {url : link})
    }

    followUnfollow(user_id){
        return new Promise((resolve, reject) => {
            this._globals.postMethod('/user/follow-user',{user_id : user_id})
                .subscribe((response : any) => {
                    resolve(response)
                }, reject)
        })
    }

    getTaskDetails(slug: any) {
        return new Promise((resolve, reject) => {
            this._globals.postMethod('/task/task-show', {slug : slug})
                .subscribe((taskDetails: any) => {
                    const taskData = this._globals.parseJwt(taskDetails.data);
                    this.taskDetails = { ...taskData.data, profileImage: null };
                    this.taskDetails.profileImage  = `${this._globals.ENV.PROFILE_IMAGE}/${this.taskDetails.task.user_id}/avatar.jpg`;
                    this.taskDetailsOnChanged.next(this.taskDetails);
                    resolve(this.taskDetails);
                }, reject);
        });
    }



    /**
     * Get timeline
     */
    getTimeline(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-timeline')
                .subscribe((timeline: any) => {
                    this.timeline = timeline;
                    this.timelineOnChanged.next(this.timeline);
                    resolve(this.timeline);
                }, reject);
        });
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-about')
                .subscribe((about: any) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

    /**
     * Get photos & videos
     */
    getPhotosVideos(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-photos-videos')
                .subscribe((photosVideos: any) => {
                    this.photosVideos = photosVideos;
                    this.photosVideosOnChanged.next(this.photosVideos);
                    resolve(this.photosVideos);
                }, reject);
        });
    }

    requestHideTask(data : any ) {
        return this._globals.postMethod('/task/task-hide', data).pipe(
          map(response => <Response>response)
        );
      }
    
      decodeJwt(data){
        return this._globals.parseJwt(data);
      }
    
    updateTaskCategory(data : any) {
        return this._globals.postMethod('/task/task-update-category',data);
    }

}
