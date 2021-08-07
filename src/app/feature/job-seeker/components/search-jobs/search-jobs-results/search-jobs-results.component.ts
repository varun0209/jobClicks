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
  selector: 'app-search-jobs-results',
  templateUrl: './search-jobs-results.component.html',
  styleUrls: ['./search-jobs-results.component.scss']
})
export class SearchJobsResultsComponent implements OnInit, OnDestroy {

   // form models
   searchJob: FormGroup;

   searchJobsData = {
    getAllGobs: [],
    filtercount: null
   }
   searchJobsFilterData: any;

   defaultFreshLength = 5;
   defaultEmpLength = 5;
   defaultLocLength = 5;
   defaultEduLength = 5;
   defaultRemoteLength = 5;
   defaultSalaryLength = 5;

   defaultCount = true;

   maxiumExperience = 0
   minimumExperience = 0

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    public appService: AppService,
    private spinnerService: SpinnerService,
    public searchJobsService: SearchJobsService,
    private router: Router
  ) {
    this.subscription = this.searchJobsService.getMessage().subscribe(res => {
      if(res && typeof res == 'object') {
        this.defaultCount = true;
        this.searchJobModel()
        this.searchJob.patchValue(res);
        this.searchJobsData = {
          getAllGobs: [],
          filtercount: null
         }
        this.searchJobs();
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.searchJobsService.sendMessage('removeJobDetails');
    this.subscription.unsubscribe();
  }


  searchJobModel() {

    this.searchJob = this.fb.group({
      jobTitle: ['', Validators.required],
      keySkills: [''],
      location: [''],
      employementType: [''],
      freshness: [''],
      education: [''],
      maxiumExperience: [''],
      minimumExperience: [''],
      remoteOptions: [''],
      salary: ['']
    });

  }

  searchJobs() {
    const url = `${this.appService.searchJobs}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GETWITHOUTHEADERS,
      requestObj: this.searchJob.value
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res.data) {
        if(this.defaultCount) {
          this.searchJobsData = { ...res.data };
          this.searchJobsFilterData = res.data.filtercount;
        } else {
          this.searchJobsData = res.data;
        }
        // this.showPagePerIndex = [];
        // for(let i = 0; i < this.searchJobsData?.getAllGobs.length; i+20 ) {
        //  this.showPagePerIndex.push(i);
        // }
      }
    });
  }

  getCount(key, id, val) {
    const array = this.searchJobsData && this.searchJobsData.filtercount && this.searchJobsData.filtercount[key] ? this.searchJobsData.filtercount[key] : [];
    if(!array.length) {
      return 0
    }
    const obj = array && array.length && array.find(res => res[id] == val)
    return obj ? obj.count : 0
  }

  filterValue(event, value, key) {
    var val = this.searchJob.get(key).value;
    if(key == 'minimumExperience' || key == 'maxiumExperience') {
      val = key == 'minimumExperience' ? this.minimumExperience : this.maxiumExperience;
      val = val.toString()
      // val = event.target.value;
    } else {
      if(event.target.checked) {
        val = val ? (val + ',' + value) : value.toString();
      } else {
        val = val.split(',').filter(res => res != value).join(',');
      }
    }
    this.searchJob.patchValue({
      [key]: val
    })
    this.defaultCount = false;
    this.searchJobs();
  }



  
}
