import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesOrNoComponent } from './yes-or-no.component';

describe('YesOrNoComponent', () => {
  let component: YesOrNoComponent;
  let fixture: ComponentFixture<YesOrNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesOrNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YesOrNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
