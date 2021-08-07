import { Injectable } from '@angular/core';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { AppService } from '../../../../core/services/app.service';
import { CommonService } from '../../../../core/services/common.service';
import { SpinnerService } from '../../../../core/services/spinner.service';

@Injectable()

export class MyprofileService {


  constructor(
    private commonService: CommonService,
    private appService: AppService,
    private spinnerService: SpinnerService
  ) { }

  removeItem(obj, callBack) {
    let url
    if(obj.form === 'employeeEducationinformationForm') {
      url = `${this.appService.removeEmployeeEducation}?educationId=${obj.value}`;
    } else if(obj.form === 'employeeSkillsinformationForm') {
      url = `${this.appService.removeEmployeeSkill}?skillId=${obj.value}`;
    } else if(obj.form === 'employeeworkexperienceForm') {
      url = `${this.appService.removeEmployeeWorkExperience}?experienceId=${obj.value}`;
    } else if(obj.form === 'employeeCertificationinformationForm') {
      url = `${this.appService.removeEmployeeCertification}?certificationId=${obj.value}`;
    }
    const apiObj = {
      url: url,
      methodType: HttpMethod.DELETE
    }
    this.commonService.commonApiCall(apiObj, (res, statusFlag) => {
        this.spinnerService.hide();
        if (statusFlag) {
          callBack(true)
        }
      }
    );
  }

  updateItem(obj, method = HttpMethod.PUT) {
    let url
    if(obj.key === 'employeePersonalinformationForm') {
      url = `${this.appService.updateEmployeedata}`;
    } else if(obj.key === 'employeeJobinformationForm') {
      url = `${this.appService.updateEmployeeJobInformationdata}`;
    } else if(obj.key === 'employeeSkillsinformationForm') {
      url = `${this.appService.saveEmployeeSkillsData}`;
    } else if(obj.key === 'employeeEducationinformationForm') {
      url = `${this.appService.saveEmployeeEducationData}`;
    } else if(obj.key === 'employeeworkexperienceForm') {
      url = `${this.appService.saveEmployeeWorkExperienceData}`;
    }
    const apiObj = {
      url: url,
      methodType: method,
      requestObj: obj.requestObj
    }
    this.commonService.commonApiCall(apiObj, (res, statusFlag) => {
        this.spinnerService.hide();
      }
    );
  }

  updateEmployeeFiles(id, key, file) {
    const url = `${this.appService.updateEmployeeFiles}`
    var formData: any = new FormData();
    formData.append('employeeID', id);
    formData.append(key, file);
    const apiObj = {
      url: url,
      methodType: HttpMethod.PUT,
      requestObj: formData
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
     
    }));
  }


  removeEmployeeFiles(obj, callBack) {
    let fileNo: number;
    if(obj.key === 'profile') {
        fileNo = 1
    } else if(obj.key === 'resume') {
      fileNo = 3
    } else if(obj.key === 'coverlater') {
      fileNo = 4
    }
    const url = `${this.appService.removeEmployeeFiles}?EmployeeID=${obj.id}&DeletedFile=${fileNo}`
    const apiObj = {
      url: url,
      methodType: HttpMethod.DELETE
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag) {
        callBack(true)
      }
    }));
  }
  
  

}
