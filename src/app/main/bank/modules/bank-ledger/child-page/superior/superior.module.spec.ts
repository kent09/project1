import { SuperiorModule } from './superior.module';

describe('SuperiorModule', () => {
  let superiorModule: SuperiorModule;

  beforeEach(() => {
    superiorModule = new SuperiorModule();
  });

  it('should create an instance', () => {
    expect(superiorModule).toBeTruthy();
  });
});
