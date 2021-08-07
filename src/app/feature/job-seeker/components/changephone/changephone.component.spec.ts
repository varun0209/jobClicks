import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangephoneComponent } from './changephone.component';

describe('ChangephoneComponent', () => {
  let component: ChangephoneComponent;
  let fixture: ComponentFixture<ChangephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangephoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
