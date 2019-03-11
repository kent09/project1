import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from '../../globals/globals.service';

export interface Following {
    value: number;
    viewValue: string;
}
@Component({
    selector: 'app-steemit-calculator',
    templateUrl: './steemit-calculator.component.html',
    styleUrls: ['./steemit-calculator.component.scss']
})
export class SteemitCalculatorComponent implements OnInit {
    params = {
        following: 1,
        task_for_today: 1,
        total_rewards: 1000,
        type: 'max'
    }
    logs: string = ``;
    following: Following[] = [
        { value: 0, viewValue: 'None' },
        { value: 1, viewValue: '1 of 3' },
        { value: 2, viewValue: '2 of 3' },
        { value: 3, viewValue: 'All' }
    ];
    loading: boolean = false;

    constructor(private _fuseConfigService: FuseConfigService, private http: HttpClient, private _global: GlobalsService) {
    }

    ngOnInit() {
        this.logs = `   Ready!`;
    }
    calculate() {
        let data = this.params;
        this.loading = true;
        this.logs = `   Calculating`;
        let counter = 0;
        const interval = setInterval(() => {
            this.logs += ` .`;
            counter++;
            if (counter == 4) {
                this.logs = `   Calculating`;
                counter = 0;
            }
        }, 500);


        this._global.postMethod('/get-voting-weight', data).subscribe(res => {
            this.loading = false;
            clearInterval(interval);
            const multiplier = (res.data.type === 'max') ? res.data.for_max_SUP : res.data.for_min_SUP;
            this.logs = `Following : ${res.data.following} of ${res.data.to_follow},
Total Rewards : ${res.data.total_rewards}
nth Task For Today : ${res.data.task_for_today}
Limit Weight : 10% for '${res.data.type}' type
Reward Multiplier : ${multiplier}%
Min SBD value : ${res.data.min_sbd_price}
SUP : ${res.data.sup_price} USD
SBD : ${res.data.sbd_price} USD
==========================================================
New Weight : ${res.data.new_weight / 100}% as of NOW!
est. SBD Value : ${res.data.value} as of NOW!
==========================================================
Done...`;
        }, (err) => {
            this.loading = false;
        });
    }
    onValChange(any) {
        this.params.type = any;
    }

}
