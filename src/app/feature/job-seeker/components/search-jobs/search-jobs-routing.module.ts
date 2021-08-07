import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchJobDetailsComponent } from './search-job-details/search-job-details.component';
import { SearchJobsFilterComponent } from './search-jobs-filter/search-jobs-filter.component';
import { SearchJobsResultsComponent } from './search-jobs-results/search-jobs-results.component';
import { SearchJobsComponent } from './search-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: SearchJobsComponent,
    children: [
      {
        path: '', redirectTo: '/advanced-search', pathMatch: 'full'
      },
      {
    path: 'advanced-search',
    component: SearchJobsFilterComponent
  },
  {
    path: 'job-results',
    component: SearchJobsResultsComponent
  },
  {
    path: 'job-details/:id',
    component: SearchJobDetailsComponent
  }
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchJobsRoutingModule { }
