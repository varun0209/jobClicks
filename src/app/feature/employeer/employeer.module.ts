import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeerRoutingModule } from './employeer-routing.module';
import { PostJobComponent } from './components/post-job/post-job.component';

import { SharedImportModule } from '../../shared-import';
import { SharedModule } from '../../shared/shared.module';
import { CreateCompanyProfileComponent } from './components/create-company-profile/create-company-profile.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { CompanyProfileOverviewComponent } from './components/company-profile-overview/company-profile-overview.component';
import { HomeComponent } from './components/home/home.component';
import { PostJobPreviewComponent } from './components/post-job-preview/post-job-preview.component';
import { ManageJobsComponent } from './components/manage-jobs/manage-jobs.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { ChangephoneComponent } from './components/changephone/changephone.component';
import {JobpostComponent} from './components/jobpost/jobpost.component';
@NgModule({
  declarations: [
    PostJobComponent,
    CreateCompanyProfileComponent,
    LayoutComponent,
    HeaderComponent,
    CompanyProfileOverviewComponent,
    HomeComponent,
    PostJobPreviewComponent,
    ManageJobsComponent,
    ResumeComponent,
    ReportsComponent,
    JobpostComponent,
    ChangeEmailComponent,
    ChangephoneComponent],
  imports: [
    CommonModule,
    EmployeerRoutingModule,
    SharedImportModule,
    SharedModule,
  ]
})
export class EmployeerModule { }
