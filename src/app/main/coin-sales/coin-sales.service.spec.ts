import { TestBed, inject } from '@angular/core/testing';

import { CoinSalesService } from './coin-sales.service';

describe('CoinSalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinSalesService]
    });
  });

  it('should be created', inject([CoinSalesService], (service: CoinSalesService) => {
    expect(service).toBeTruthy();
  }));
});
