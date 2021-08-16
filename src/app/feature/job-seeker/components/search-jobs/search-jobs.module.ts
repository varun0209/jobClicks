import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedImportModule } from '../../../../shared-import';
import { SharedModule } from '../../../../shared/shared.module';

import { SearchJobsRoutingModule } from './search-jobs-routing.module';
import { SearchJobsComponent } from './search-jobs.component';
import { SearchJobsFilterComponent } from './search-jobs-filter/search-jobs-filter.component';
import { SearchJobsResultsComponent } from './search-jobs-results/search-jobs-results.component';
import { RecommendedJobsComponent } from './recommended-jobs/recommended-jobs.component';
import { SearchJobDetailsComponent } from './search-job-details/search-job-details.component';
import { SearchJobCardComponent } from './search-job-card/search-job-card.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ManageJobsAlertComponent } from './manage-jobs-alert/manage-jobs-alert.component';
import { CreateJobAlertComponent } from './manage-jobs-alert/create-job-alert/create-job-alert.component';


@NgModule({
  declarations: [ 
    SearchJobsComponent, SearchJobsFilterComponent, SearchJobsResultsComponent, 
    RecommendedJobsComponent, SearchJobDetailsComponent, SearchJobCardComponent,
    AppliedJobsComponent,
    ManageJobsAlertComponent,
    CreateJobAlertComponent
  ],
  imports: [
    CommonModule,
    SearchJobsRoutingModule,
    SharedImportModule,
    SharedModule
  ]
})

export class SearchJobsModule { }
