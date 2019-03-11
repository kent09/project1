import { TestBed, inject } from '@angular/core/testing';

import { HardUnlinkService } from './hard-unlink.service';

describe('HardUnlinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HardUnlinkService]
    });
  });

  it('should be created', inject([HardUnlinkService], (service: HardUnlinkService) => {
    expect(service).toBeTruthy();
  }));
});
