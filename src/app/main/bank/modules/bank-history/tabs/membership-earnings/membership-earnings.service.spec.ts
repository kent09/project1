import { TestBed, inject } from '@angular/core/testing';

import { MembershipEarningsService } from './membership-earnings.service';

describe('MembershipEarningsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembershipEarningsService]
    });
  });

  it('should be created', inject([MembershipEarningsService], (service: MembershipEarningsService) => {
    expect(service).toBeTruthy();
  }));
});
