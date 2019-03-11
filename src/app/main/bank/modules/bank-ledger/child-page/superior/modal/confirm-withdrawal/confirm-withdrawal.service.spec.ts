import { TestBed, inject } from '@angular/core/testing';

import { ConfirmWithdrawalService } from './confirm-withdrawal.service';

describe('ConfirmWithdrawalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmWithdrawalService]
    });
  });

  it('should be created', inject([ConfirmWithdrawalService], (service: ConfirmWithdrawalService) => {
    expect(service).toBeTruthy();
  }));
});
