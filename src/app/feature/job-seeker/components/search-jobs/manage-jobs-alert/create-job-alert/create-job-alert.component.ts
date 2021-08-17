import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpMethod } from '../../../../../../core/enums/http-handlers';
import { AppService } from '../../../../../../core/services/app.service';
import { CommonService } from '../../../../../../core/services/common.service';
import { SpinnerService } from '../../../../../../core/services/spinner.service';
import { SearchJobsService } from '../../search-jobs.service';

@Component({
  selector: 'app-create-job-alert',
  templateUrl: './create-job-alert.component.html',
  styleUrls: ['./create-job-alert.component.scss']
})
export class CreateJobAlertComponent implements OnInit {

  clearAlertForm: FormGroup;

  submitted = false;

  // show server error
  showServerErrors =  {
    jobtitle: ''
  }

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    public commonService: CommonService,
    private spinnerService: SpinnerService,
    public searchJobsService: SearchJobsService,
    public dialogRef: MatDialogRef<CreateJobAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
  }

  ngOnInit(): void {
    const loginData = JSON.parse(localStorage.getItem('loginData'));

    this.clearAlertForm = this.fb.group({
      jobAlertName: ['', Validators.required],
      jobAlertId: [0],
      employeeId: [loginData.id],
      industry: [''],
      industryName: [''],
      keywords: [''],
      jobTitle: ['', Validators.required],
      salaryId: [''],
      location: [''],
      minExperience: [0],
      maxExperience: [0]
    });

    if(this.data.type == 'edit' || this.data.type == 'view') {
      this.clearAlertForm.patchValue(this.data.value);
      if(this.data.value.industry && this.data.value.industry !== 'IT') {
        this.clearAlertForm.patchValue({
          industryName: this.data.value.industry,
          industry: 'Others'
        })
      }
      this.setKeywords();
      if(this.data.type == 'view') {
        this.clearAlertForm.disable()
      }
    }
    this.clearAlertForm.get('jobAlertName').valueChanges.subscribe(res => {
      this.showServerErrors ? this.showServerErrors.jobtitle = '': null
    })
  }

  setKeywords() {
    const key = this.clearAlertForm.value.keywords ? this.clearAlertForm.value.keywords.split(',') : []
    this.clearAlertForm.patchValue({
      keywords: typeof key === 'string' ? [key] : key
    })
  }

changeIndustry() {
  this.clearAlertForm.controls['industryName'].setErrors(null);
  if(this.clearAlertForm.value.industry == 'Others') {
    this.clearAlertForm.controls['industryName'].setErrors({ required: true });
  }
}

updateError() {
  if(this.clearAlertForm.value.industryName) {
    this.clearAlertForm.controls['industryName'].setErrors(null);
  } else {
    this.clearAlertForm.controls['industryName'].setErrors({ required: true });
  }
}


clearValue(key) {
  this.clearAlertForm.patchValue({
    [key]: ''
  })
}

setValues(value, key, id?) {
  this.clearAlertForm.patchValue({
    [key]: id ? value[id] : value
  })
}


selectMax() {
  this.clearAlertForm.controls['maxExperience'].setErrors(null);
  this.clearAlertForm.controls['minExperience'].setErrors(null);
  if(!this.clearAlertForm.get('minExperience').value) {
    this.clearAlertForm.controls['minExperience'].setErrors({'min': true});
  }
  if(this.clearAlertForm.get('maxExperience').value && (+this.clearAlertForm.get('minExperience').value > +this.clearAlertForm.get('maxExperience').value)) {
    this.clearAlertForm.controls['maxExperience'].setErrors({'max': true});
  }
}


submitCreateAlert() {
  if(this.data.type == 'view') {
    this.data.type = 'edit';
    this.clearAlertForm.enable();
    return;
  }
  this.submitted = true;
  if(this.clearAlertForm.value.industry == 'Others' && this.clearAlertForm.value.industryName) {
    this.clearAlertForm.patchValue({
      industry: this.clearAlertForm.value.industryName
    })
  }
    if(this.clearAlertForm.invalid) {
      return
    }
    this.clearAlertForm.patchValue({
      keywords: this.clearAlertForm.value.keywords && this.clearAlertForm.value.keywords.length ? this.clearAlertForm.value.keywords.join(',') : ''
    })
    this.createEmployeeJobAlert();
}


createEmployeeJobAlert() {
  const url = this.data.type != 'new' ?  `${this.appService.updateEmployeeJobAlert}` : `${this.appService.createEmployeeJobAlert}`;
  const apiObj = {
    url: url,
    methodType: this.data.type != 'new' ?  HttpMethod.PUT : HttpMethod.POST,
    requestObj: this.clearAlertForm.value
  }
  this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
    this.spinnerService.hide();
    if(statusFlag === 'showControlError') {
      this.showServerErrors = res.data;
    } else if(statusFlag) {
      this.dialogRef.close(true)
    } else {
      this.setKeywords()
    }
  });
}

}
