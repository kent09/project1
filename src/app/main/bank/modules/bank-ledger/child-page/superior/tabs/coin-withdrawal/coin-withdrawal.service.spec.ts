import { TestBed, inject } from '@angular/core/testing';

import { CoinWithdrawalService } from './coin-withdrawal.service';

describe('CoinWithdrawalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinWithdrawalService]
    });
  });

  it('should be created', inject([CoinWithdrawalService], (service: CoinWithdrawalService) => {
    expect(service).toBeTruthy();
  }));
});
