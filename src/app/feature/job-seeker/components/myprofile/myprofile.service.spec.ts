import { TestBed } from '@angular/core/testing';

import { MyprofileService } from './myprofile.service';

describe('MpprofileService', () => {
  let service: MyprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
