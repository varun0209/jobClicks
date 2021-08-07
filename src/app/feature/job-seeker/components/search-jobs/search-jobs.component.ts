import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
 
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    private appService: AppService,
    private route: Router,
    public searchJobsService: SearchJobsService,
    private spinnerService: SpinnerService
  ) {
    this.route.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          this.submitted = false;
          if(event.url.includes('advanced-search')) {
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
   
   this.subscription =  this.searchJobsService.getMessage().subscribe(res => {
      if(res == 'removeJobDetails') {
        this.submitted = false;
        this.searchJobModel();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.searchJobModel();
    this.searchJobsService.getJobSearchDropdownData();
  }

  searchJobModel() {
    this.searchJob = this.fb.group({
      jobTitle: ['', Validators.required],
      location: ['']
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
    this.searchJobsService.sendMessage(this.searchJob.value);
    this.searchJobsService.perviousRoute = 'auth/employee/search-jobs/advanced-search';
    this.route.navigateByUrl('auth/employee/search-jobs/job-results')
  }

  back() {
    if(this.searchJobsService.perviousRoute) {
      this.route.navigateByUrl(this.searchJobsService.perviousRoute);
    }
  }

}
