import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobclicksAddsComponent } from './jobclicks-adds.component';

describe('JobclicksAddsComponent', () => {
  let component: JobclicksAddsComponent;
  let fixture: ComponentFixture<JobclicksAddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobclicksAddsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobclicksAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
