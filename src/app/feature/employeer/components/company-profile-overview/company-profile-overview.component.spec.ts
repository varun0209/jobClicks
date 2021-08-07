import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileOverviewComponent } from './company-profile-overview.component';

describe('CompanyProfileOverviewComponent', () => {
  let component: CompanyProfileOverviewComponent;
  let fixture: ComponentFixture<CompanyProfileOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyProfileOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
