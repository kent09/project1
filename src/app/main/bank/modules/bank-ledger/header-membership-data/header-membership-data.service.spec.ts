import { TestBed, inject } from '@angular/core/testing';

import { HeaderMembershipDataService } from './header-membership-data.service';

describe('HeaderMembershipDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderMembershipDataService]
    });
  });

  it('should be created', inject([HeaderMembershipDataService], (service: HeaderMembershipDataService) => {
    expect(service).toBeTruthy();
  }));
});
