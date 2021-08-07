import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerLoginComponent } from './employeer-login.component';

describe('EmployeerLoginComponent', () => {
  let component: EmployeerLoginComponent;
  let fixture: ComponentFixture<EmployeerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
