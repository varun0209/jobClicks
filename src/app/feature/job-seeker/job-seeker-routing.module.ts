import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HomeComponent } from './components/home/home.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ProfileoverviewComponent } from './components/profileoverview/profileoverview.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import {EmployeelayoutComponent} from './employeelayout/employeelayout.component'
const routes: Routes = [
  {
    path: '',
    component: EmployeelayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'create-myprofile',
        component: MyprofileComponent
      },
      {
        path: 'edit-myprofile',
        component: MyprofileComponent
      },
      {
        path: 'myprofile-overview',
        component: ProfileoverviewComponent
      },
      {
        path: 'alerts',
        component: AlertsComponent
      },
      // {
      //   path: 'saved-jobs',
      //   component: SavedJobsComponent
      // },
      {
        path: 'search-jobs',
        loadChildren: () =>
          import('./components/search-jobs/search-jobs.module').then((m) => m.SearchJobsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
