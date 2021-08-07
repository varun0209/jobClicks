import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../core/services/common.service';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { MustMatch } from '../../../../core/services/confirmed.validator';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { EmployeerLoginComponent } from '../employeer-login/employeer-login.component';

@Component({
  selector: 'app-employeer-register',
  templateUrl: './employeer-register.component.html',
  styleUrls: ['./employeer-register.component.scss']
})
export class EmployeerRegisterComponent implements OnInit {



  // login form model
  registerForm: FormGroup;
  verificationForm: FormGroup;

  // to show input error messgae
  submitted = false;

  // to show verification section
  showVerificationCode = false;

  // to show others control
  showOthersControl = false

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
    public dialogRef: MatDialogRef<EmployeerRegisterComponent>,
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
      companyName: ['', Validators.required],
      contactPersonName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$")])],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      mobileNo: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      countryCode: ['+1', Validators.required], 
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
    const url = `${this.appService.employerRegister}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: this.registerForm.value
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if(statusFlag === 'showControlError') {
        this.showServerErrors = res.data;
      } else if (statusFlag && res && res.hasOwnProperty('data') && res.data.hasOwnProperty('userId')) {
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
    const url = `${this.appService.employerVerifyEmail}?userId=${this.verificationForm.get('UserId').value}&otp=${this.verificationForm.get('Verificationcode').value}`;
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
    this.commonService.openDialog({ template: EmployeerLoginComponent}, (res) => { })
  }

}
