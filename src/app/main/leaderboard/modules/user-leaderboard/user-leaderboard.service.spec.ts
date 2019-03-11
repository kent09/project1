import { TestBed, inject } from '@angular/core/testing';

import { UserLeaderboardService } from './user-leaderboard.service';

describe('UserLeaderboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLeaderboardService]
    });
  });

  it('should be created', inject([UserLeaderboardService], (service: UserLeaderboardService) => {
    expect(service).toBeTruthy();
  }));
});
