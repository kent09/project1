import { BitcoinModule } from './bitcoin.module';

describe('BitcoinModule', () => {
  let bitcoinModule: BitcoinModule;

  beforeEach(() => {
    bitcoinModule = new BitcoinModule();
  });

  it('should create an instance', () => {
    expect(bitcoinModule).toBeTruthy();
  });
});
