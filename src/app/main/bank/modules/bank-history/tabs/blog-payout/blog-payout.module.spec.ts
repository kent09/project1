import { BlogPayoutModule } from './blog-payout.module';

describe('BlogPayoutModule', () => {
  let blogPayoutModule: BlogPayoutModule;

  beforeEach(() => {
    blogPayoutModule = new BlogPayoutModule();
  });

  it('should create an instance', () => {
    expect(blogPayoutModule).toBeTruthy();
  });
});
