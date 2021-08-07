import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../../../core/services/common.service';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { ChangephoneComponent } from '../changephone/changephone.component';
import { ChangeEmailComponent } from '../change-email/change-email.component';

@Component({
  selector: 'app-profileoverview',
  templateUrl: './profileoverview.component.html',
  styleUrls: ['./profileoverview.component.scss']
})
export class ProfileoverviewComponent implements OnInit {

  employeeData: any;
  loginData: any;
  IUrl: any = "";

  higereducationdata:any = [];
  currentlyworkingdata:any = [];
  
  constructor(
    public commonService: CommonService,
    public appService: AppService,
    private spinnerService: SpinnerService,
    private Imageurl: AppService,
  ) {
    this.IUrl = this.Imageurl.domain;
  }

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.employeeData = null;
    const url = `${this.appService.getEmployeeDatabyUserID}?userid=${this.loginData.userId}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.employeeData = res.data;
        this.currentlyworkingdata = this.employeeData.employeeWorkExperiences.find(iteam => iteam.currentlyWorking);
        this.higereducationdata = this.employeeData.employeeEducations.find(iteam => iteam.higherEducation);
      }
    });
  }

  editMobile() {
    this.commonService.openDialog({ template: ChangephoneComponent, data: this.loginData}, (res) => { 
      if(res) {
        this.getEmployeeDetails()
      }
    }) 

  }

  editEmail() {
    this.commonService.openDialog({ template: ChangeEmailComponent, data: this.loginData}, (res) => {  }) 

  }

}
