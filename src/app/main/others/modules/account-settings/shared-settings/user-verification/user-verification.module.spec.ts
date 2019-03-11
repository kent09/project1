import { UserVerificationModule } from './user-verification.module';

describe('UserVerificationModule', () => {
  let userVerificationModule: UserVerificationModule;

  beforeEach(() => {
    userVerificationModule = new UserVerificationModule();
  });

  it('should create an instance', () => {
    expect(userVerificationModule).toBeTruthy();
  });
});
