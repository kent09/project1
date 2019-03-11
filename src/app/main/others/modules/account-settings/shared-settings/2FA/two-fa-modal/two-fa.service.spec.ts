import { TestBed, inject } from '@angular/core/testing';

import { TwoFaService } from './two-fa.service';

describe('TwoFaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwoFaService]
    });
  });

  it('should be created', inject([TwoFaService], (service: TwoFaService) => {
    expect(service).toBeTruthy();
  }));
});
