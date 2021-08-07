import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../core/services/common.service';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { MustMatch } from '../../../../core/services/confirmed.validator';
import { LoginComponent } from '../login/login.component';
import { SpinnerService } from '../../../../core/services/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  isShowResumeModel = false;

  // login form model
  registerForm: FormGroup;
  verificationForm: FormGroup;

  // to show input error messgae
  submitted = false;

  // to show verification section
  showVerificationCode = false;

  // to hide and show password
  hide = true;

  // show server error
  showServerErrors =  {
    otp: '',
    email: ''
  }

  constructor(

    private fb: FormBuilder,
    public commonService: CommonService,
    private appService: AppService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private spinnerService: SpinnerService

  ) { }

  ngOnInit(): void {
    this.registerFormModel();
    this.verificationForm.get('Verificationcode').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.otp = '': null
    })
    this.registerForm.get('email').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.email = '': null
    })
  }

  registerFormModel() {
    //employee form validation methods
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$")])],
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
      mobileNo: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      countryCode: ['+1', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: [MustMatch('password', 'confirmPassword')]
      });

    this.verificationForm = this.fb.group({
      UserId: ['', Validators.required],
      Verificationcode: ['', Validators.required],
    })

  }


  submitForm() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const url = `${this.appService.empRegister}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: this.registerForm.value
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag === 'showControlError') {
        this.showServerErrors = res.data;
      } else  if (statusFlag && res && res.hasOwnProperty('data') && res.data.hasOwnProperty('userId')) {
        this.submitted = false;
        this.showVerificationCode = true;
        this.verificationForm.patchValue({
          UserId: res.data.userId
        })
      }
    }));
  }

  submitVerficationCode() {
    this.submitted = true;
    if (this.verificationForm.invalid) {
      return;
    }
    const url = `${this.appService.employeeVerifyEmail}?userId=${this.verificationForm.get('UserId').value}&otp=${this.verificationForm.get('Verificationcode').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if(statusFlag === 'showControlError') {
        this.showServerErrors = res.data;
      } else if (statusFlag) {
        this.loginModel();
        this.isShowResumeModel = false;
      }
    }))
  }

  uploadResumeData(data) {
    if (data) {
      const url = `${this.appService.uploadResumeAndCoverLater}`;
      var formData: any = new FormData();
      formData.append('Resume', data.Resume);
      formData.append("CoverLater", data.CoverLater);
      formData.append("userId", this.verificationForm.get('UserId').value);
      const apiObj = {
        url: url,
        methodType: HttpMethod.POST,
        requestObj: formData
      }
      this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
        this.spinnerService.hide();
        this.dialogRef.close();
        this.commonService.openDialog({ template: LoginComponent}, (res) => { })
      }))
    } else {
      this.dialogRef.close();
      this.commonService.openDialog({ template: LoginComponent}, (res) => { })
    }
  }


  resendVerification() {
    const url = `${this.appService.resendVerification}?userId=${this.verificationForm.get('UserId').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
    }))
  }

  loginModel() {
    this.dialogRef.close();
    this.commonService.openDialog({ template: LoginComponent}, (res) => { })
  }

}
