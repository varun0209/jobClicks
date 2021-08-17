import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { AppService } from '../../../../core/services/app.service';
import { CommonService } from '../../../../core/services/common.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { SearchJobsService } from './search-jobs.service';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit, OnDestroy {

   // form models
  searchJob: FormGroup;

    // to show input error messgae
  submitted = false;

  hideBack = false
 
  showSearch = true;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    private appService: AppService,
    private route: Router,
    private router: ActivatedRoute,
    public searchJobsService: SearchJobsService,
    private spinnerService: SpinnerService
  ) {
    this.searchJobsService.getJobSearchDropdownData();
    this.route.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          this.submitted = false;
          if(event.url.includes('applied-jobs') || event.url.includes('manage-jobs-alerts') || event.url.includes('jobs-alerts')) {
            this.showSearch = false;
          } else {
            this.showSearch = true;
          }
          if(event.url.includes('advanced-search')) {
            this.submitted = false;
            this.searchJobModel();
            this.hideBack = true
          } else {
            this.hideBack = false
          }
      }

      // if (event instanceof NavigationError) {
      //     // Hide loading indicator

      //     // Present error to user
      // }

   });
   
  }

  ngOnDestroy() {
  }


  ngOnInit(): void {
    this.searchJobModel();
    this.searchJob.patchValue(this.router.queryParams['_value']);
  }

  searchJobModel() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    this.searchJob = this.fb.group({
      jobTitle: ['', Validators.required],
      location: [''],
      employeeId: [loginData.id.toString()]
    });
  }

  clearValue(key) {
    this.searchJob.patchValue({
      [key]: ''
    })
  }

  setValues(value, key, id?) {
    this.searchJob.patchValue({
      [key]: id ? value[id] : value
    })
  }

  basicSearchJob() {
    this.submitted = true;
    if(this.searchJob.invalid) {
      return
    }
    this.searchJobsService.perviousRoute = 'auth/employee/search-jobs/advanced-search';
    this.route.navigate(['auth/employee/search-jobs/job-results'], { queryParams:  this.searchJob.value } )
  }

  back() {
    if(this.searchJobsService.perviousRoute) {
      this.route.navigate([this.searchJobsService.perviousRoute], { queryParams:  this.searchJob.value } );
    }
  }

}
