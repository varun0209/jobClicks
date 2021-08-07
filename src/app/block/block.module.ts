import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppLayoutComponent } from './app-layout/app-layout.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './user-management/jobSeeker/register/register.component';
import { LoginComponent } from './user-management/jobSeeker/login/login.component';
import { ForgotPasswordComponent } from './user-management/jobSeeker/forgot-password/forgot-password.component';
import { EmployeerLoginComponent } from './user-management/employeer/employeer-login/employeer-login.component';
import { EmployeerRegisterComponent } from './user-management/employeer/employeer-register/employeer-register.component';
import { EmployeerForgotPasswordComponent } from './user-management/employeer/employeer-forgot-password/employeer-forgot-password.component';

import { SharedImportModule } from '../shared-import';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    UserManagementComponent,
    FooterComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    EmployeerLoginComponent,
    EmployeerRegisterComponent,
    EmployeerForgotPasswordComponent,
    HomeComponent,
    BlogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedImportModule,
    SharedModule
  ],
  exports:[
    AppLayoutComponent,
    UserManagementComponent,
    FooterComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent
  ]
})
export class BlockModule { }
