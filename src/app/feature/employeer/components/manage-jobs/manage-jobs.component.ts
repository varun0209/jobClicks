import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertInfo } from '../../../../core/enums/alert-info';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { AppService } from '../../../../core/services/app.service';
import { CommonService } from '../../../../core/services/common.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { YesOrNoComponent } from '../../../../shared/components/yes-or-no/yes-or-no.component';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent implements OnInit {

  tableData: any;

  selectedAll = [];

  loginData: any;

  constructor(
    private appService: AppService,
    private commonService: CommonService,
    private router: Router,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.getAllJobDetails();
  }


  onLinkClickEmit(event) {
    this.router.navigate(['/auth/employeer/post-job-preview', event.jobId]);
    // this.router.navigateByUrl('/auth/employeer/update-post-job')
  }


  onEditRowEmit(event) {
    this.router.navigate(['/auth/employeer/update-post-job', event.jobId]);
    // this.router.navigateByUrl('/auth/employeer/update-post-job')

  }

  postJob() {
    this.router.navigateByUrl('/auth/employeer/post-job')
  }



  getAllJobDetails() {
    const url = `${this.appService.getAllJobDetails}?employerId=${this.loginData.id}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.formTable(res.data)
      }
    }));
  }

  formTable(data) {
    this.tableData = {
      list: data,
      columns: [
        { key: 'jobId', label: 'Job ID', type: 'checkbox' },
        { key: 'jobTitle', label: 'Job Title(Designation)', type: 'link' },
        { key: 'recruiterName', label: 'Recruiter'},
        { key: 'applicationReceivedCount', label: 'Application Recived', type: 'link' },
        { key: 'totalPositions', label: 'Total Positions'},
        { key: 'filledPositionCount', label: 'Filled'},
        { key: 'vacanciesCount', label: 'Vacancies'},
        { key: 'isActive', label: 'Status', type: 'dropdown' , lists: [ { isActive: true, text: 'Active' }, { isActive: false, text: 'In-active'  }] , id: 'isActive', text: 'text' },
        { key: 'action', label: 'Action', type: 'action', edit: true }
      ],
      uniqueKey: 'jobId'
    }
  }

  onCheckboxClickEmit(event) {
      this.selectedAll = event.data;
  }

  statusChange(value) {
    let jobIds = '';
    this.selectedAll.forEach(res => jobIds = res.checked ? (jobIds ? (jobIds + ',' + res.jobId) : res.jobId) : jobIds);
    if(!jobIds) {
      this.commonService.snackBar('Please Select Jobs', AlertInfo.INFO)
      return
    }
    const selectedList = this.selectedAll.filter(res => res.checked);
    if(selectedList.some(res => res.isActive ==  value) ) {
      this.commonService.snackBar('Cant do Active to Active', AlertInfo.INFO)
      return
    }
    const obj = {
      template: YesOrNoComponent,
      data: {
        description: `Do you want to <span class='in-active-text'>${value ? 'Active' : 'In-active'}</span> the job status`,
        yes: value ? 'Yes! Active' : 'Yes! In-active',
        buttonClass: value ? 'actie-btn' : 'in-actie-btn',
      }
    }
    this.commonService.openDialog(obj, (res) => {
      if(res) {
          const obj = { value: value, element: { jobId: jobIds }};
          this.updateJobStatus(obj, true)
      }
    })
    
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
          this.getAllJobDetails();
        }
      } else {
        this.getAllJobDetails();
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

}


