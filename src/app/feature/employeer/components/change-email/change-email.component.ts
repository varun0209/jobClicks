import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonService } from '../../../../core/services/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../core/services/app.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { MustMatch } from '../../../../core/services/confirmed.validator';
import { LoginComponent } from '../../../../block/user-management/jobSeeker/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {

   // form models
   emailForm: FormGroup;
 
   // to show input error messgae
   submitted = false;
 
   // to show verification section
   showVerfifcationSection = false;
 
   constructor(
     private fb: FormBuilder,
     private commonService: CommonService,
     private appService: AppService,
     public dialogRef: MatDialogRef<ChangeEmailComponent>,
     private route: Router,
     private spinnerService: SpinnerService,
     @Inject(MAT_DIALOG_DATA) public data
   ) { }
 
   ngOnInit(): void {
     this.emailFormModel();
   }
 
   emailFormModel() {
 
     this.emailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
      userId: [this.data.userId, Validators.required],
      otp: ['', Validators.required]
     });
 
   }
 
   // employee verfy email
   onVerfyEmail() {
     this.submitted = true;
     if (this.emailForm.get('email').invalid || this.emailForm.get('userId').invalid) {
       return;
     }
     const url = `${this.appService.verifyEmployerEmail}`;
     const apiObj = {
       url: url,
       methodType: HttpMethod.POST,
       requestObj: this.emailForm.value
     }
     this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
       this.spinnerService.hide();
       if (statusFlag) {
         this.submitted = false;
         this.showVerfifcationSection = true;
         this.emailForm.get('email').disable();
       }
     }))
   }
 
   // verificationfor employee
   confirmCode() {
     this.submitted = true;
     if (this.emailForm.invalid) {
       return;
     }
     this.emailForm.get('email').enable();
     const url = `${this.appService.updateEmployerEmail}`;
     const apiObj = {
       url: url,
       methodType: HttpMethod.PUT,
       requestObj: this.emailForm.value
     }
     this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
       this.spinnerService.hide();
       if (statusFlag) {
         this.dialogRef.close();
         this.route.navigateByUrl('');
         this.commonService.openDialog({ template: LoginComponent }, (res) => { })
       }
     }))
   }
 
 }
 
 