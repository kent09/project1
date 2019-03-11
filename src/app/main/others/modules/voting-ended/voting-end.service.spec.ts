import { TestBed, inject } from '@angular/core/testing';

import { VotingEndService } from './voting-end.service';

describe('VotingEndService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotingEndService]
    });
  });

  it('should be created', inject([VotingEndService], (service: VotingEndService) => {
    expect(service).toBeTruthy();
  }));
});
