import { TestBed } from '@angular/core/testing';

import { SearchJobsService } from './search-jobs.service';

describe('SearchJobsService', () => {
  let service: SearchJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
