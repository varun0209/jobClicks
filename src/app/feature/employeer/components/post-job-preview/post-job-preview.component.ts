import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../core/services/common.service';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { SpinnerService } from '../../../../core/services/spinner.service';
import * as QuillNamespace from "quill";
import { ActivatedRoute, Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

let Quill: any = QuillNamespace;

@Component({
  selector: 'app-post-job-preview',
  templateUrl: './post-job-preview.component.html',
  styleUrls: ['./post-job-preview.component.scss']
})
export class PostJobPreviewComponent implements OnInit {

  @Output() previewjobpostcancel = new EventEmitter();
  @Output() previewcancelpost = new EventEmitter()

  // to show input error messgae
  showpostjob:boolean = true;
  jobDeatils:any;
  companyDeatils:any;
  previewProfile:boolean = true;
  previewProfilebacktomj:boolean = false;
  selectedjobid: number;
  contactPersonData:any;

  @Input() set previewjob(value) {
    if(value) {
      this.jobDeatils = value.postjobData;
      this.companyDeatils = value.companyData;
      this.contactPersonData = value.contactPersonData;
    }
  }

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    public appService: AppService,
    private route: Router,
    private router: ActivatedRoute,
    private spinnerService: SpinnerService
  ) { }

  backManageJob() {
    this.route.navigateByUrl('/auth/employeer/manage-job');
  }

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      if (res.hasOwnProperty('jobId') && res.jobId) {
        this.selectedjobid = res.jobId;
        this.getjobdatabyid();
      }
    })
  }

  getjobdatabyid(){
    const url = `${this.appService.getJobDetailsEmpByJobId}?jobId=${this.selectedjobid}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, (res, statusFlag) => {
      this.spinnerService.hide();
        //  this.jobpostdata = res.data;
        if(statusFlag) {
          

         this.jobDeatils = res.data.jobs[0];
         this.companyDeatils = res.data
         this.contactPersonData = res.data.contactPerson[0];
         this.previewProfile = false;
        this.previewProfilebacktomj = true;
        }
    })
  }

  clrearForm(){
    this.previewcancelpost.emit(true);
  }

  Backtojobpost(){
    this.previewjobpostcancel.emit(true);
  }

  back(){
    this.showpostjob = false;
  }

  Backtomanagejobs(){
    this.route.navigateByUrl('/auth/employeer/manage-job');
  }

 submitForm(){
  const url = `${this.appService.savejobdata}`;

  this.companyDeatils.jobs = [{ ...this.jobDeatils }];
  const data = [ { ...this.companyDeatils }, { ...this.contactPersonData } ]
  const apiObj = {
    url: url,
    methodType: HttpMethod.POST,
    requestObj: data
  }
  this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
    this.spinnerService.hide();
    if (statusFlag) {
      this.route.navigateByUrl('/auth/employeer/manage-job');
      //this.previewcancelpost.emit(true);
    }
  }));
 }
}
