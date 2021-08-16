import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpMethod } from '../../../../../core/enums/http-handlers';
import { AppService } from '../../../../../core/services/app.service';
import { CommonService } from '../../../../../core/services/common.service';
import { SpinnerService } from '../../../../../core/services/spinner.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { SearchJobsService } from '../search-jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-jobs-filter',
  templateUrl: './search-jobs-filter.component.html',
  styleUrls: ['./search-jobs-filter.component.scss']
})
export class SearchJobsFilterComponent implements OnInit {

  // form models
  searchJob: FormGroup;

  submitted = false;

  
  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    private appService: AppService,
    private route: Router,
    private spinnerService: SpinnerService,
    public searchJobsService: SearchJobsService
  ) { }

  ngOnInit(): void {
    this.searchJobModel();
  }

  searchJobModel() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    this.searchJob = this.fb.group({
      jobTitle: ['', Validators.required],
      keySkills: [''],
      location: [''],
      employementType: [''],
      freshness: [''],
      maxiumExperience: [''],
      minimumExperience: [''],
      remoteOptions: [''],
      salary: [''],
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

  selectMax() {
    this.searchJob.controls['maxiumExperience'].setErrors(null);
    this.searchJob.controls['minimumExperience'].setErrors(null);
    if(!this.searchJob.get('minimumExperience').value) {
      this.searchJob.controls['minimumExperience'].setErrors({'min': true});
    }
    if(this.searchJob.get('maxiumExperience').value && (+this.searchJob.get('minimumExperience').value > +this.searchJob.get('maxiumExperience').value)) {
      this.searchJob.controls['maxiumExperience'].setErrors({'max': true});
    }
  }

  advancedSearchJob() {
    this.submitted = true;
    if(this.searchJob.invalid) {
      return
    }
    this.searchJob.patchValue({
      keySkills: this.searchJob.value.keySkills && this.searchJob.value.keySkills.length ? this.searchJob.value.keySkills.join(',') : ''
    })
    this.searchJobsService.perviousRoute = 'auth/employee/search-jobs/advanced-search';
    this.route.navigate(['auth/employee/search-jobs/job-results'], { queryParams:  this.searchJob.value } )
  }

  cancel(){
    this.searchJobModel();
  }

}
