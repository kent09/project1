import { SteemitCalculatorModule } from './steemit-calculator.module';

describe('SteemitCalculatorModule', () => {
  let steemitCalculatorModule: SteemitCalculatorModule;

  beforeEach(() => {
    steemitCalculatorModule = new SteemitCalculatorModule();
  });

  it('should create an instance', () => {
    expect(steemitCalculatorModule).toBeTruthy();
  });
});
