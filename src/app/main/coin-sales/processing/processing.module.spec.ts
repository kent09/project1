import { ProcessingModule } from './processing.module';

describe('ProcessingModule', () => {
  let processingModule: ProcessingModule;

  beforeEach(() => {
    processingModule = new ProcessingModule();
  });

  it('should create an instance', () => {
    expect(processingModule).toBeTruthy();
  });
});
