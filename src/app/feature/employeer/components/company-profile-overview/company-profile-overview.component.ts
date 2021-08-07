import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../../../core/services/common.service';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { ChangephoneComponent } from '../changephone/changephone.component';
import { AlertInfo } from '../../../../core/enums/alert-info';
import { Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-company-profile-overview',
  templateUrl: './company-profile-overview.component.html',
  styleUrls: ['./company-profile-overview.component.scss']
})
export class CompanyProfileOverviewComponent implements OnInit {

  employeeData: any;

  userId: any;

  fileExtension = ['png', 'jpg', 'jpeg'];

  fileList = [];

  constructor(
    public commonService: CommonService,
    public appService: AppService,
    private spinnerService: SpinnerService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployerDetails();
  }

  editProfile() {
    this.router.navigateByUrl('/auth/employeer/update-companyProfile');
  }

  getEmployerDetails() {
    this.userId = JSON.parse(localStorage.getItem('loginData'))
    const url = `${this.appService.getEmployerDetails}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.employeeData = res.data;
      }
    }));
  }

  editLogo(template) {
    this.commonService.openDialog({ template: template, data: this.userId}, (res) => { 
      if(res) {
        this.getEmployerDetails()
      }
    }) 
  }

  editPhone() {
    this.commonService.openDialog({ template: ChangephoneComponent, data: this.userId}, (res) => { 
      if(res) {
        this.getEmployerDetails()
      }
    }) 
  }

  editEmail() {
    this.commonService.openDialog({ template: ChangeEmailComponent, data: this.userId}, (res) => { }) 
  }

  emitFilesList(event) {
    this.fileList = event
  }

  updateEmployerLogo() {
    if(!(this.fileList && this.fileList.length)) {
        this.commonService.snackBar('Please Upload File', AlertInfo.ERROR)
    }
    const url = `${this.appService.updateEmployerLogo}`
    var formData: any = new FormData();
    formData.append('companyLogo', this.fileList[0]);
    formData.append("employerId", this.employeeData.employerId);
    const apiObj = {
      url: url,
      methodType: HttpMethod.PUT,
      requestObj: formData
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      if (statusFlag) {
        this.commonService.hideDialog();
        this.getEmployerDetails();
        // this.router.navigateByUrl('');
      }
    }));
  }

}
