import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../../../core/services/app.service';
import { CommonService } from '../../../../../core/services/common.service';
import { SearchJobsService } from '../search-jobs.service';

@Component({
  selector: 'app-search-job-card',
  templateUrl: './search-job-card.component.html',
  styleUrls: ['./search-job-card.component.scss']
})
export class SearchJobCardComponent implements OnInit {

  @Input() list = [];

  p: number = 1;
  pageSize = 20;

  constructor(
    public appService: AppService,
    public commonService: CommonService,
    public searchJobsService: SearchJobsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  changePagePerIndex(i) {
    this.pageSize = i
  }

  showDetails(job) {
    if(job.jobApplyed) {
      return;
    }
    this.searchJobsService.perviousRoute = 'auth/employee/search-jobs/job-results';
    this.router.navigate(['auth/employee/search-jobs/job-details', job.jobId]);
  }

}
