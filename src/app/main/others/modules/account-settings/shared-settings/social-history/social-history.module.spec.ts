import { SocialHistoryModule } from './social-history.module';

describe('SocialHistoryModule', () => {
  let socialHistoryModule: SocialHistoryModule;

  beforeEach(() => {
    socialHistoryModule = new SocialHistoryModule();
  });

  it('should create an instance', () => {
    expect(socialHistoryModule).toBeTruthy();
  });
});
