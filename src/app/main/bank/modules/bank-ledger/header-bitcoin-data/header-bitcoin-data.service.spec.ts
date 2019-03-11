import { TestBed, inject } from '@angular/core/testing';

import { HeaderBitcoinDataService } from './header-bitcoin-data.service';

describe('HeaderBitcoinDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderBitcoinDataService]
    });
  });

  it('should be created', inject([HeaderBitcoinDataService], (service: HeaderBitcoinDataService) => {
    expect(service).toBeTruthy();
  }));
});
