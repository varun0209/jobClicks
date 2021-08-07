import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobPreviewComponent } from './post-job-preview.component';

describe('PostJobPreviewComponent', () => {
  let component: PostJobPreviewComponent;
  let fixture: ComponentFixture<PostJobPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostJobPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostJobPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
