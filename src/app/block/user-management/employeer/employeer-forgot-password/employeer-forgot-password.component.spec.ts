import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerForgotPasswordComponent } from './employeer-forgot-password.component';

describe('EmployeerForgotPasswordComponent', () => {
  let component: EmployeerForgotPasswordComponent;
  let fixture: ComponentFixture<EmployeerForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
