import { MembershipEarningsModule } from './membership-earnings.module';

describe('MembershipEarningsModule', () => {
  let membershipEarningsModule: MembershipEarningsModule;

  beforeEach(() => {
    membershipEarningsModule = new MembershipEarningsModule();
  });

  it('should create an instance', () => {
    expect(membershipEarningsModule).toBeTruthy();
  });
});
