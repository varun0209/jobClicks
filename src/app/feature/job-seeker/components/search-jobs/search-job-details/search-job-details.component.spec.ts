import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobDetailsComponent } from './search-job-details.component';

describe('SearchJobDetailsComponent', () => {
  let component: SearchJobDetailsComponent;
  let fixture: ComponentFixture<SearchJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
