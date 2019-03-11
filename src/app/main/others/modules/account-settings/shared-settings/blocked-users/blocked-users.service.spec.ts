import { TestBed, inject } from '@angular/core/testing';

import { BlockedUsersService } from './blocked-users.service';

describe('BlockedUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockedUsersService]
    });
  });

  it('should be created', inject([BlockedUsersService], (service: BlockedUsersService) => {
    expect(service).toBeTruthy();
  }));
});
