import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpMethod } from '../../../../../core/enums/http-handlers';
import { AppService } from '../../../../../core/services/app.service';
import { CommonService } from '../../../../../core/services/common.service';
import { SpinnerService } from '../../../../../core/services/spinner.service';
import { SearchJobsService } from '../search-jobs.service';

@Component({
  selector: 'app-job-alerts',
  templateUrl: './job-alerts.component.html',
  styleUrls: ['./job-alerts.component.scss']
})
export class JobAlertsComponent implements OnInit {

  jobAlertsData = []

  id: any;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    public appService: AppService,
    private spinnerService: SpinnerService,
    private router: ActivatedRoute,
    private route: Router,
    public searchJobsService: SearchJobsService
  ) {
    this.router.params.subscribe(res => {
      if (res.hasOwnProperty('id') && res.id) {
        this.id = res.id
        this.getJobsBasedonJobAlertbyEmployeeID()
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  getJobsBasedonJobAlertbyEmployeeID() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const apiObj = {
      url: `${this.appService.getJobsBasedonJobAlertbyEmployeeID}?EmployeeID=${loginData.id}&jobalertId=${this.id}`,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res.data) {
          this.jobAlertsData = res.data;
      }
    });
  }
  
  updateRoute() {
  this.searchJobsService.perviousRoute = `auth/employee/search-jobs/jobs-alerts/${this.id}`;
  }
  
  back() {
      this.route.navigateByUrl('auth/employee/search-jobs/manage-jobs-alerts');
  }

}
