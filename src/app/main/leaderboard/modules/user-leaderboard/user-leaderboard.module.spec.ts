import { UserLeaderboardModule } from './user-leaderboard.module';

describe('UserLeaderboardModule', () => {
  let userLeaderboardModule: UserLeaderboardModule;

  beforeEach(() => {
    userLeaderboardModule = new UserLeaderboardModule();
  });

  it('should create an instance', () => {
    expect(userLeaderboardModule).toBeTruthy();
  });
});
