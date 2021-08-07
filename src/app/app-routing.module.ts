import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './block/blog/blog.component';
import { HomeComponent } from './block/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
   },
   {
     path: 'blog',
     component: BlogComponent
   },
   {
     path: 'home',
     component: HomeComponent
   },
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/feature.module').then((m) => m.FeatureModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
