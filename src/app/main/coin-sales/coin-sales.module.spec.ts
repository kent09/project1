import { CoinSalesModule } from './coin-sales.module';

describe('CoinSalesModule', () => {
  let coinSalesModule: CoinSalesModule;

  beforeEach(() => {
    coinSalesModule = new CoinSalesModule();
  });

  it('should create an instance', () => {
    expect(coinSalesModule).toBeTruthy();
  });
});
