import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HttpMethod } from '../../../../../core/enums/http-handlers';
import { AppService } from '../../../../../core/services/app.service';
import { CommonService } from '../../../../../core/services/common.service';
import { SpinnerService } from '../../../../../core/services/spinner.service';
import { DomSanitizer } from '@angular/platform-browser';
import { YesOrNoComponent } from '../../../../../shared/components/yes-or-no/yes-or-no.component';
import { AlertInfo } from '../../../../../core/enums/alert-info';

@Component({
  selector: 'app-search-job-details',
  templateUrl: './search-job-details.component.html',
  styleUrls: ['./search-job-details.component.scss']
})
export class SearchJobDetailsComponent implements OnInit {

  getJobDetailsbyJobIdData: any;
  
  constructor(    
    public commonService: CommonService,
    public appService: AppService,
    private spinnerService: SpinnerService,
    private router: ActivatedRoute,
    private route: Router,
    public sanitizer: DomSanitizer
  ) { 

    this.router.params.subscribe(res => {
      if (res.hasOwnProperty('id') && res.id) {
        this.getJobDetailsbyJobId(res.id)
      }
    })
  }

  ngOnInit(): void {
  }

  getJobDetailsbyJobId(id) {
    const url = `${this.appService.getJobDetailsbyJobId}?JobID=${id}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res.data) {
        this.getJobDetailsbyJobIdData = res.data;
      }
    });
  }


  applyJobsinEmployee(job) {
    const url = `${this.appService.applyJobsinEmployee}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: {
        employeeId :job.employerId,
        jobId : job.jobId,
        actionType :1
        }
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res.data) {
        this.applyJobModel(res.data, job)
      }
    });
  }
  

  applyJobModel(data, job) {
    const obj = {
      template: YesOrNoComponent,
      data: {
        header: 'Make sure!',
        description: `Your <span class='in-active-text'>${data}</span> fields are not field.`,
        yes: data ? 'Skip & Apply Job' : 'Apply Job',
        no: data ? 'Edit Profile' : '',
        buttonClass: 'actie-btn',
        showNoButton: !data ? true : false
      }
    }
    this.commonService.openDialog(obj, (res) => { 
        if(res) {
          this.applyJob(job)
        } else {
          this.route.navigateByUrl('auth/employee/edit-myprofile');
        }
    })
  }

  applyJob(job) {
    const url = `${this.appService.skipAndApplyPosition}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: {
        employeeId :job.employerId,
        jobId : job.jobId,
        actionType :1
        }
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res.data && res.data.applyed) {
        this.commonService.snackBar('Successfully Applied Job', AlertInfo.SUCCESS)
      }
    });
  }
  

}
