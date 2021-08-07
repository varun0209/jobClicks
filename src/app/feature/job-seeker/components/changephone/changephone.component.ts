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
  selector: 'app-changephone',
  templateUrl: './changephone.component.html',
  styleUrls: ['./changephone.component.scss']
})
export class ChangephoneComponent implements OnInit {

 
   // form models
   phoneForm: FormGroup;
 
   // to show input error messgae
   submitted = false;
 

   constructor(
     private fb: FormBuilder,
     public commonService: CommonService,
     private appService: AppService,
     public dialogRef: MatDialogRef<ChangephoneComponent>,
     private route: Router,
     private spinnerService: SpinnerService,
     @Inject(MAT_DIALOG_DATA) public data
   ) { }
 
   ngOnInit(): void {
     this.phoneFormModel();
   }
 
   phoneFormModel() {
 
     this.phoneForm = this.fb.group({
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      userId: [this.data.userId, Validators.required],
      countryCode: ['+1', Validators.required]
     });
 
   }
 
   // employee verfy email
   submit() {
     this.submitted = true;
     if (this.phoneForm.invalid) {
       return;
     }
     const url = `${this.appService.updateMobileNumber}`;
     const apiObj = {
       url: url,
       methodType: HttpMethod.PUT,
       requestObj: this.phoneForm.value
     }
     this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
       this.spinnerService.hide();
       if (statusFlag) {
        this.dialogRef.close(true);
      }
     }))
   }
 
 
 }
 
 