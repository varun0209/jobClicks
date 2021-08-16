import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  @Input() showApply = false;
  @Input() showApplied = false;

  @Output() updateRoute = new EventEmitter()

  constructor(
    public appService: AppService,
    public commonService: CommonService,
    public searchJobsService: SearchJobsService,
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  changePagePerIndex(i) {
    this.pageSize = i
  }

  showAppliedDetails(job) {
    if(job.jobApplyed) {
      return;
    }
    this.showDetails(job);
  }
  
  showDetails(job) {
    this.updateRoute.emit();
    this.route.navigate(['auth/employee/search-jobs/job-details', job.jobId], { queryParams:  this.router.queryParams['_value'] });
  }

}
