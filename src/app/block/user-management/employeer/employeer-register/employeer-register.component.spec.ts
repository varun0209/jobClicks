import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerRegisterComponent } from './employeer-register.component';

describe('EmployeerRegisterComponent', () => {
  let component: EmployeerRegisterComponent;
  let fixture: ComponentFixture<EmployeerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
