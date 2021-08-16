import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertInfo } from '../../../../../core/enums/alert-info';
import { HttpMethod } from '../../../../../core/enums/http-handlers';
import { AppService } from '../../../../../core/services/app.service';
import { CommonService } from '../../../../../core/services/common.service';
import { SpinnerService } from '../../../../../core/services/spinner.service';
import { YesOrNoComponent } from '../../../../../shared/components/yes-or-no/yes-or-no.component';
import { SearchJobsService } from '../search-jobs.service';
import { CreateJobAlertComponent } from './create-job-alert/create-job-alert.component';

@Component({
  selector: 'app-manage-jobs-alert',
  templateUrl: './manage-jobs-alert.component.html',
  styleUrls: ['./manage-jobs-alert.component.scss']
})
export class ManageJobsAlertComponent implements OnInit {

tableData: any;

selectedAll = [];

loginData: any;

constructor(
  private appService: AppService,
  private commonService: CommonService,
  private router: Router,
  private spinnerService: SpinnerService,
  private searchJobsService: SearchJobsService
) {}

ngOnInit(): void {
  this.loginData = JSON.parse(localStorage.getItem('loginData'));
  this.getJobDetailsbyJobId();
  
}

jobAlert(value, type) {
  const obj = {
    template: CreateJobAlertComponent,
    data: {
      value: value,
      type: type
    }
  }
  this.commonService.openDialog(obj, (res) => {
    if(res) {
        this.getJobDetailsbyJobId();
    }
  })
}

getJobDetailsbyJobId() {
  this.formTable(null)
  const url = `${this.appService.getAllEmployeeJobAlerts}?EmployeeId=${this.loginData.id}`;
  const apiObj = {
    url: url,
    methodType: HttpMethod.GET
  }
  this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
    this.spinnerService.hide();
    if (statusFlag && res && res.hasOwnProperty('data')) {
      this.formTable(res.data)
    }
  });
}

formTable(data) {
  this.tableData = {
    list: data,
    columns: [
      { key: 'jobAlertId', label: 'Job ID', type: 'checkbox' },
      { key: 'jobAlertName', label: 'Alert Name', type: 'link' },
      { key: 'jobTitle', label: 'Job Title(Designation)'},
      { key: 'keywords', label: 'Keywords'},
      { key: 'experience', label: 'Experience' },
      { key: 'salaryName', label: 'Salary' },
      { key: 'industry', label: 'Industry' },
      { key: 'location', label: 'Location' },
      { key: 'action', label: 'Action', type: 'action', edit: true, delete: true, view: true }
    ],
    uniqueKey: 'jobAlertId'
  }
}

onCheckboxClickEmit(event) {
  this.selectedAll = event.data;
}

onDeleteRows(value?) {
  let jobAlertIds = '';
  if(value) {
    jobAlertIds = value.jobAlertId;
  } else {
    this.selectedAll.forEach(res => jobAlertIds = (jobAlertIds ? (jobAlertIds + ',' + res.jobAlertId) : res.jobAlertId));
    if(!jobAlertIds) {
      this.commonService.snackBar('Please Select Jobs', AlertInfo.ERROR)
      return
    }
  }
  this.onDeleteRow(jobAlertIds)
}

onDeleteRow(value) {
  this.confirmationPopup(value, (flag) => {
    if(flag) {
        this.deleteSelectedEmployeeJobAlert(value);
    }
  })
}

confirmationPopup(value,callBack) {
  const obj = {
    template: YesOrNoComponent,
    data: {
      description: `Do you want to delete job alert`,
    }
  }
  this.commonService.openDialog(obj, (res) => {
      callBack(res)
  })
}

deleteSelectedEmployeeJobAlert(value) {
  const url = `${this.appService.deleteSelectedEmployeeJobAlert}?JobAlertIds=${value}`;
  const apiObj = {
    url: url,
    methodType: HttpMethod.DELETE
  }
  this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
    this.spinnerService.hide();
    if (statusFlag && res && res.hasOwnProperty('data')) {
      this.getJobDetailsbyJobId()
    }
  });
}

updateJobStatus(event, flag?) {
  // if(!flag) {
  //   const status = event.data.find(res => res.jobId == event.element.jobId);
  //   if(status.isActive === event.element.isActive) {
  //     this.commonService.snackBar('Cant change same status', AlertInfo.ERROR)
  //     return
  //   }
  // }
  const url = `${this.appService.updateJobStatus}`;
  const obj = { jobId : event.element.jobId , isActive : event.value }
  const apiObj = {
    url: url,
    methodType: HttpMethod.PUT,
    requestObj: obj
  }
  this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
    this.spinnerService.hide();
    if (statusFlag) {
      if(flag) {
        this.getJobDetailsbyJobId();
      }
    } else {
      this.getJobDetailsbyJobId();
    }
  }));
}


getJobDetailsByJobId(jobID) {
  const url = `${this.appService.getJobDetailsByJobId}?jobId=${jobID}`;
  const apiObj = {
    url: url,
    methodType: HttpMethod.GET
  }
  this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
    this.spinnerService.hide();
    if (statusFlag && res && res.hasOwnProperty('data')) {
       
    }
  }));
}



onLinkClickEmit(event) {
  this.router.navigate(['/auth/employeer/post-job-preview', event.jobId]);
  // this.router.navigateByUrl('/auth/employeer/update-post-job')
}



}


