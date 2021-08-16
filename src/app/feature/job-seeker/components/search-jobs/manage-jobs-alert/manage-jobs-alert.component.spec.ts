import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobsAlertComponent } from './manage-jobs-alert.component';

describe('ManageJobsAlertComponent', () => {
  let component: ManageJobsAlertComponent;
  let fixture: ComponentFixture<ManageJobsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobsAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJobsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
