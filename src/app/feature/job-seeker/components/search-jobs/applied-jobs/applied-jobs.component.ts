import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpMethod } from '../../../../../core/enums/http-handlers';
import { AppService } from '../../../../../core/services/app.service';
import { CommonService } from '../../../../../core/services/common.service';
import { SpinnerService } from '../../../../../core/services/spinner.service';
import { SearchJobsService } from '../search-jobs.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

   searchJobsData = []

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    public appService: AppService,
    private spinnerService: SpinnerService,
    public searchJobsService: SearchJobsService
  ) {
      this.searchJobs();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  searchJobs() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const apiObj = {
      url: `${this.appService.getAllApplyedJobDetails}?EmployeeID=${loginData.id}`,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res.data) {
          this.searchJobsData = res.data ;
        // this.showPagePerIndex = [];
        // for(let i = 0; i < this.searchJobsData?.getAllGobs.length; i+20 ) {
        //  this.showPagePerIndex.push(i);
        // }
      }
    });
  }
  
  updateRoute() {
  this.searchJobsService.perviousRoute = 'auth/employee/search-jobs/applied-jobs';
  }
}
