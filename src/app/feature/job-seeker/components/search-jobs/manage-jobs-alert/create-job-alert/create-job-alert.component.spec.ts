import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobAlertComponent } from './create-job-alert.component';

describe('CreateJobAlertComponent', () => {
  let component: CreateJobAlertComponent;
  let fixture: ComponentFixture<CreateJobAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
