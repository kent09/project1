import { TestBed, inject } from '@angular/core/testing';

import { BlogPayoutService } from './blog-payout.service';

describe('BlogPayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogPayoutService]
    });
  });

  it('should be created', inject([BlogPayoutService], (service: BlogPayoutService) => {
    expect(service).toBeTruthy();
  }));
});
