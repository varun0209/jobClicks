import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobsResultsComponent } from './search-jobs-results.component';

describe('SearchJobsResultsComponent', () => {
  let component: SearchJobsResultsComponent;
  let fixture: ComponentFixture<SearchJobsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJobsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
