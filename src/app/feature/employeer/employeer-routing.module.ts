import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyProfileOverviewComponent } from './components/company-profile-overview/company-profile-overview.component';
import { CreateCompanyProfileComponent } from './components/create-company-profile/create-company-profile.component';
import { HomeComponent } from './components/home/home.component';
import { ManageJobsComponent } from './components/manage-jobs/manage-jobs.component';
import { PostJobPreviewComponent } from './components/post-job-preview/post-job-preview.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ResumeComponent } from './components/resume/resume.component';
import { LayoutComponent } from './layout/layout.component';
import {JobpostComponent} from './components/jobpost/jobpost.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'create-companyProfile',
        component: CreateCompanyProfileComponent
      },
      {
        path: 'update-companyProfile',
        component: CreateCompanyProfileComponent
      },
      {
        path: 'companyProfile-overview',
        component: CompanyProfileOverviewComponent
      },
      {
        path: 'jobpost',
        component: JobpostComponent,
      },
      {
        path: 'post-job',
        component: PostJobComponent
      },
      {
        path: 'post-job-preview/:jobId',
        component: PostJobPreviewComponent
      },
      {
        path: 'update-post-job/:jobId',
        component: PostJobComponent
      },
      {
        path: 'manage-job',
        component: ManageJobsComponent
      },
      {
        path: 'resume',
        component: ResumeComponent
      },
      {
        path: 'report',
        component: ReportsComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeerRoutingModule { }
