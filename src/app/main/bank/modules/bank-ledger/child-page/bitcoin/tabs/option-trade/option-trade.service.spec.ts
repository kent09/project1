import { TestBed, inject } from '@angular/core/testing';

import { OptionTradeService } from './option-trade.service';

describe('OptionTradeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionTradeService]
    });
  });

  it('should be created', inject([OptionTradeService], (service: OptionTradeService) => {
    expect(service).toBeTruthy();
  }));
});
