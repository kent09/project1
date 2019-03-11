import { TestBed, inject } from '@angular/core/testing';

import { VotingActiveService } from './voting-active.service';

describe('VotingActiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotingActiveService]
    });
  });

  it('should be created', inject([VotingActiveService], (service: VotingActiveService) => {
    expect(service).toBeTruthy();
  }));
});
