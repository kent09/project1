import { TestBed, inject } from '@angular/core/testing';

import { MainSearchService } from './main-search.service';

describe('MainSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainSearchService]
    });
  });

  it('should be created', inject([MainSearchService], (service: MainSearchService) => {
    expect(service).toBeTruthy();
  }));
});
