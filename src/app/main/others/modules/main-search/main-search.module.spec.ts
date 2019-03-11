import { MainSearchModule } from './main-search.module';

describe('MainSearchModule', () => {
  let mainSearchModule: MainSearchModule;

  beforeEach(() => {
    mainSearchModule = new MainSearchModule();
  });

  it('should create an instance', () => {
    expect(mainSearchModule).toBeTruthy();
  });
});
