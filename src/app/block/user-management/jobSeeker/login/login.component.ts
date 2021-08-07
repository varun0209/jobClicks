import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../core/services/common.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { Router } from '@angular/router';
import { UploadResumeComponent } from '../../../../shared/components/upload-resume/upload-resume.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // login form model
  loginForm: FormGroup;

  // to hide and show password
  hide = true;

  // to show input error messgae
  submitted = false;

  // show server error
  showServerErrors = {
    email: '',
    password: ''
  }

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private route: Router,
    private appService: AppService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.loginFormGroup();
    this.loginForm.get('email').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.email = '' : null
    })
    this.loginForm.get('password').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.password = '': null
    })
  }

  loginFormGroup() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
      password: ['', Validators.required],
    });
  }

  loginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const url = this.appService.loginEmployee;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: this.loginForm.value
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if(statusFlag === 'showControlError') {
        this.showServerErrors = res.data;
      } else if (statusFlag) {
        this.dialogRef.close();
        if (res && res.hasOwnProperty('data')) {
          if (res.data.hasOwnProperty('accessToken')) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("loginData", JSON.stringify(res.data));
          }
          if (res.data.id === 0) {
            this.route.navigateByUrl('/auth/employee/create-myprofile');
          } else {
            this.route.navigateByUrl('/auth/employee/home');
          }
        }
        // sessionStorage.setItem('userName', (res.data.userName));
        // sessionStorage.setItem('roles', (res.data.roleId));
        // sessionStorage.setItem('rolesid', JSON.stringify(res.data.roles));
        // sessionStorage.setItem('token', (res.data.accessToken));
        // sessionStorage.setItem('userid', (res.data.userId));
        // sessionStorage.setItem('Employeeid', (res.data.id));
        // this.authenticationService.logdin(res.data.accessToken);
        // this.loginroleid = res.data.roleId;
        // if (this.loginroleid === 4) {
        //   this.isemployee = true;
        //   this.isnologin = false;
        //   this.isemployer = false
        //   this.commonnavbar = false;
        // } else {
        //   this.commonnavbar = true;
        // }
        // this.modalService.dismissAll();
        // this.route.navigateByUrl('/jobsearch');



      }
    }));
  }


  showForgotPwdModel() {
    this.dialogRef.close();
    this.commonService.openDialog({ template: ForgotPasswordComponent}, (res) => { })
  }

  showRegisterModel() {
    this.dialogRef.close();
    this.commonService.openDialog({ template: RegisterComponent}, (res) => { })
  }

}
