import { MembershipBillingModule } from './membership-billing.module';

describe('MembershipBillingModule', () => {
  let membershipBillingModule: MembershipBillingModule;

  beforeEach(() => {
    membershipBillingModule = new MembershipBillingModule();
  });

  it('should create an instance', () => {
    expect(membershipBillingModule).toBeTruthy();
  });
});
