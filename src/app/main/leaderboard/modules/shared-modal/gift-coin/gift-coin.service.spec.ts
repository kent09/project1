import { TestBed, inject } from '@angular/core/testing';

import { GiftCoinService } from './gift-coin.service';

describe('GiftCoinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftCoinService]
    });
  });

  it('should be created', inject([GiftCoinService], (service: GiftCoinService) => {
    expect(service).toBeTruthy();
  }));
});
