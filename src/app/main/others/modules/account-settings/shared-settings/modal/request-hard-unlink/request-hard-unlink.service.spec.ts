import { TestBed, inject } from '@angular/core/testing';

import { RequestHardUnlinkService } from './request-hard-unlink.service';

describe('RequestHardUnlinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestHardUnlinkService]
    });
  });

  it('should be created', inject([RequestHardUnlinkService], (service: RequestHardUnlinkService) => {
    expect(service).toBeTruthy();
  }));
});
