import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'employee',
    loadChildren: () =>
      import('./job-seeker/job-seeker.module').then((m) => m.JobSeekerModule),
  },
  {
    path: 'employeer',
    loadChildren: () =>
      import('./employeer/employeer.module').then((m) => m.EmployeerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
