import { TestBed, inject } from '@angular/core/testing';

import { TWOFAService } from './twofa.service';

describe('TWOFAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TWOFAService]
    });
  });

  it('should be created', inject([TWOFAService], (service: TWOFAService) => {
    expect(service).toBeTruthy();
  }));
});
