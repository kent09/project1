import { Injectable } from '@angular/core';
import { ImportsService } from 'app/globals/imports/imports.service';

@Injectable({
  providedIn: 'root'
})
export class CoinSalesService {

  constructor(private _imports: ImportsService) { }

  public getSupBtc() {
    return this._imports.HTTP.get('https://www.southxchange.com/api/price/SUP/BTC');
  }
  
}
