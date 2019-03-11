import { TestBed, inject } from '@angular/core/testing';

import { MembershipBillingService } from './membership-billing.service';

describe('MembershipBillingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembershipBillingService]
    });
  });

  it('should be created', inject([MembershipBillingService], (service: MembershipBillingService) => {
    expect(service).toBeTruthy();
  }));
});
