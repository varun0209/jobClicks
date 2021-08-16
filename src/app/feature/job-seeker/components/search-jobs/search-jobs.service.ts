import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { AppService } from '../../../../core/services/app.service';
import { CommonService } from '../../../../core/services/common.service';
import { SpinnerService } from '../../../../core/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SearchJobsService {

  getJobSearchDropdownDataList: any;

  perviousRoute: string;
  
  constructor(
    public commonService: CommonService,
    private appService: AppService,
    // private route: Router,
    private spinnerService: SpinnerService,
  ) { }

  getJobSearchDropdownData() {
    if(this.getJobSearchDropdownDataList) {
      return
    }
    const url = `${this.appService.getJobSearchDropdownData}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.getJobSearchDropdownDataList = res.data;
        res.data.skills.map(res => res.name = res.skillName)
        res.data.jobTitles.map(res => res.name = res.jobTitle)
        this.getJobSearchDropdownDataList.jobtitlesandskills = res.data.skills.concat(res.data.jobTitles)
      }
    });
  }

}
