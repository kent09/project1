import { TestBed, inject } from '@angular/core/testing';

import { SubmitRequestService } from './submit-request.service';

describe('SubmitRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmitRequestService]
    });
  });

  it('should be created', inject([SubmitRequestService], (service: SubmitRequestService) => {
    expect(service).toBeTruthy();
  }));
});
