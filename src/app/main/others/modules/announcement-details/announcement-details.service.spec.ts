import { TestBed, inject } from '@angular/core/testing';

import { AnnouncementDetailsService } from './announcement-details.service';

describe('AnnouncementDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnouncementDetailsService]
    });
  });

  it('should be created', inject([AnnouncementDetailsService], (service: AnnouncementDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
