import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettify'
})
export class NumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return 0;
    
    value = value.toFixed(2);

    if (args === undefined) {
      var currency = value.toString().split(".");
      currency[0] = currency[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return currency.join(".");
    }

    if (args == 'pretty') {
      return this.prettifyNumber(value)
    }

  }
  private prettifyNumber(value) {
    
    let negative = (value < 0);
    
    value = Math.abs(value);

    var thousand = 1000;
    var million = 1000000;
    var billion = 1000000000;
    var trillion = 1000000000000;

    if (value < thousand) {
      
      return (negative) ? String((value*-1)) : String(value);
    }
    if (value >= thousand && value <= 1000000) {
      return (negative) ? (Math.round(value/thousand) * -1) + 'K' : Math.round(value / thousand) + 'K';
    }

    if (value >= million && value <= billion) {
      return (negative) ? (Math.round(value / million)*-1) + 'M' : Math.round(value / million) + 'M';
    }

    if (value >= billion && value <= trillion) {
      return (negative) ? (Math.round(value / billion)*-1) + 'B' : Math.round(value / billion) + 'B';
    }
    else {
      return (negative) ? (Math.round(value / trillion) * -1) + 'T' : Math.round(value / trillion) + 'T';
    }
  }

}
