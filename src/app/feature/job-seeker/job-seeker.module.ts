import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';

import { SharedImportModule } from '../../shared-import';
import { SharedModule } from '../../shared/shared.module';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { EmployeelayoutComponent } from './employeelayout/employeelayout.component';
import { HeaderComponent } from './header/header.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileoverviewComponent } from './components/profileoverview/profileoverview.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { ChangephoneComponent } from './components/changephone/changephone.component';


@NgModule({
  declarations: [
    MyprofileComponent, EmployeelayoutComponent, HeaderComponent, AlertsComponent, 
    SavedJobsComponent, AppliedJobsComponent, HomeComponent,
    ProfileoverviewComponent, ChangeEmailComponent, ChangephoneComponent
  ],
  imports: [
    CommonModule,
    JobSeekerRoutingModule,
    SharedImportModule,
    SharedModule
  ]
})
export class JobSeekerModule { }
