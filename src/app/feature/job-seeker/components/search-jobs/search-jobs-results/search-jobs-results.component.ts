import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  //  defaultSalaryLength = 5;

   defaultCount = true;

   maxiumExperience = 0
   minimumExperience = 0

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    public appService: AppService,
    private spinnerService: SpinnerService,
    public searchJobsService: SearchJobsService,
    private router: ActivatedRoute,
    private route: Router
  ) {
   
          // this.defaultCount = true;
          
          // this.router.queryParams['_value']
          this.router.queryParams.subscribe(res => {
            this.searchJobModel()
            this.searchJob.patchValue(res);
            this.searchJobsData = {
              getAllGobs: [],
              filtercount: null
            }
            this.searchJobs();
          })

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }


  searchJobModel() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
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
      salary: [''],
      employeeId: [loginData.id.toString()]
    });

  }

  searchJobs() {
    const url = `${this.appService.searchJobs}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GETWITHOUTHEADERS,
      requestObj: this.searchJob.value
    }
    this.commonService.commonApiCall(apiObj,(resp, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && resp.data) {
        if(this.defaultCount) {
          this.searchJobsData = { ...resp.data };
          this.searchJobsFilterData = resp.data.filtercount;
        } else {
          this.searchJobsData = resp.data;
        }
        Object.keys(this.searchJobsFilterData).forEach(key => {
          this.searchJobsFilterData[key].map(el => {
            el.checked = false
            if(key === 'employeementTypeData' && this.searchJob.value.employementType) {
              el.checked = this.searchJob.value.employementType.split(',').some(res => res == el.id) ? true : false
            } else if(key === 'remoteOptionData' && this.searchJob.value.remoteOptions) {
              el.checked = this.searchJob.value.remoteOptions.split(',').some(res => res == el.remoteOptionId) ? true : false
            // } else if(key === 'salaryRanges' && this.searchJob.value.salary) {
            //   el.checked = this.searchJob.value.salary.split(',').some(res => res == el.salaryId) ? true : false
            } else if(key === 'freshness' && this.searchJob.value.freshness) {
              el.checked = this.searchJob.value.freshness.split(',').some(res => res == el.id) ? true : false
            } else if(key === 'education' && this.searchJob.value.education) {
              el.checked = this.searchJob.value.education.split(',').some(res => res == el.qualificationId) ? true : false
            }
          });
        })
        if(this.searchJob.value.maxiumExperience) {
          this.maxiumExperience = this.searchJob.value.maxiumExperience;
        }
        if(this.searchJob.value.minimumExperience) {
          this.minimumExperience = this.searchJob.value.minimumExperience
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
        val =  (key == 'location') ? (val ? (val + '-' + value) : value.toString()) : (val ? (val + ',' + value) : value.toString());
      } else {
        val = (key == 'location') ? (val.split('-').filter(res => res != value).join('-')) : (val.split(',').filter(res => res != value).join(','));
      }
    }
    this.searchJob.patchValue({
      [key]: val
    })
    this.defaultCount = false;
    this.route.navigate(['auth/employee/search-jobs/job-results'], { queryParams: this.searchJob.value })
    this.searchJobs();
  }

  updateRoute() {
    this.searchJobsService.perviousRoute = 'auth/employee/search-jobs/job-results';
    }

  
}
