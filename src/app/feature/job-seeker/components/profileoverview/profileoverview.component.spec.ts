import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileoverviewComponent } from './profileoverview.component';

describe('ProfileoverviewComponent', () => {
  let component: ProfileoverviewComponent;
  let fixture: ComponentFixture<ProfileoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
