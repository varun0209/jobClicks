import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobCardComponent } from './search-job-card.component';

describe('SearchJobCardComponent', () => {
  let component: SearchJobCardComponent;
  let fixture: ComponentFixture<SearchJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJobCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
