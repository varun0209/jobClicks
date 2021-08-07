import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobsFilterComponent } from './search-jobs-filter.component';

describe('SearchJobsFilterComponent', () => {
  let component: SearchJobsFilterComponent;
  let fixture: ComponentFixture<SearchJobsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJobsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
