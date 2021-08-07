import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../core/services/common.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../core/services/app.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { EmployeerRegisterComponent } from '../employeer-register/employeer-register.component';
import { MustMatch } from '../../../../core/services/confirmed.validator';
import { EmployeerLoginComponent } from '../employeer-login/employeer-login.component';

@Component({
  selector: 'app-employeer-forgot-password',
  templateUrl: './employeer-forgot-password.component.html',
  styleUrls: ['./employeer-forgot-password.component.scss']
})
export class EmployeerForgotPasswordComponent implements OnInit {

  // forgot form model
  forgotForm: FormGroup;
  forgotVerificationForm: FormGroup;
  resetPasswordForm: FormGroup;

  // to show input error messgae
  submitted = false;

  // to show verification section
  showForgotSection = true;
  showVerifictionSection = false;
  showResetPasswordSection = false;

  hide = true;

  // show server error
  showServerErrors =  {
    email: '',
    otp: '',
    password: ''
  }


  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private appService: AppService,
    public dialogRef: MatDialogRef<EmployeerForgotPasswordComponent>,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.forgotFormModel();
    this.forgotForm.get('Email').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.email = '': null
    })
    this.forgotVerificationForm.get('Verificationcode').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.otp = '': null
    })
    this.resetPasswordForm.get('Password').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.otp = '': null
    })
  }

  forgotFormModel() {

    this.forgotForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
    });

    this.forgotVerificationForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
      UserId: ['', Validators.required],
      Verificationcode: ['', Validators.required],
    });

    this.resetPasswordForm = this.fb.group({
      UserId: ['', Validators.required],
      Password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$")])],
      confirmPassword: ['', Validators.required],
    }, {
      validator: [MustMatch('Password', 'confirmPassword')]
    });

  }

  // employee forgot password email
  onforgotpassword() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    const url = `${this.appService.employerForgotPwd}?email=${this.forgotForm.get('Email').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if(statusFlag === 'showControlError') {
        this.showServerErrors = res.data;
      } else if (statusFlag && res && res.hasOwnProperty('data') && res.data.hasOwnProperty('userId')) {
        this.submitted = false;
        this.showForgotSection = false;
        this.showVerifictionSection = true;
        this.forgotVerificationForm.patchValue({
          Email: this.forgotForm.get('Email').value,
          UserId: res.data.userId
        })
        this.forgotVerificationForm.get('Email').disable()
      }
    }))
  }

  // verificationforforgotpassword employee
  confirmCode() {
    this.submitted = true;
    if (this.forgotVerificationForm.invalid) {
      return;
    }
    const url = `${this.appService.verifyOTP}?userId=${this.forgotVerificationForm.get('UserId').value}&otp=${this.forgotVerificationForm.get('Verificationcode').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if(statusFlag === 'showControlError') {
        this.showServerErrors = res.data;
      } else if (statusFlag) {
        this.submitted = false;
        this.showVerifictionSection = false;
        this.showResetPasswordSection = true;
        this.resetPasswordForm.patchValue({
          UserId: this.forgotVerificationForm.get('UserId').value
        })
      }
    }))
  }

  resendOTP() {
    const url = `${this.appService.resendOTP}?userId=${this.forgotVerificationForm.get('UserId').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
    }))
  }

  showRegisterModel() {
    this.dialogRef.close();
    this.commonService.openDialog({ template: EmployeerRegisterComponent }, (res) => { })
  }

  showLoginModel() {
    this.dialogRef.close();
    this.commonService.openDialog({ template: EmployeerLoginComponent}, (res) => { })
  }

  resetSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const url = `${this.appService.resetPassword}?userId=${this.resetPasswordForm.get('UserId').value}&password=${this.resetPasswordForm.get('Password').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if(statusFlag === 'showControlError') {
        this.showServerErrors = res.data;
      } else if (statusFlag) {
        this.dialogRef.close();
        this.commonService.openDialog({ template: EmployeerLoginComponent}, (res) => { })
      }
    }))
  }

}

