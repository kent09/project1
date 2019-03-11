import { TestBed, inject } from '@angular/core/testing';

import { MembershipPricingService } from './membership-pricing.service';

describe('MembershipPricingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembershipPricingService]
    });
  });

  it('should be created', inject([MembershipPricingService], (service: MembershipPricingService) => {
    expect(service).toBeTruthy();
  }));
});
