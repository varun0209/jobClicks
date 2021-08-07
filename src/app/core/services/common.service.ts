import { Injectable } from '@angular/core';
import { HttpMethod } from '../enums/http-handlers';
import { checkNullOrUndefined } from '../utilities/nullOrUndefined';
import { AlertInfo } from '../enums/alert-info';
import { take } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService} from './api.service';
import { SpinnerService } from './spinner.service';
import { ToasterComponent } from '../../shared/components/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  dialogRef: any;

  constructor(
    // private apiService: ApiService,
    // private alertService: AlertService,
    public dialog: MatDialog,
    private apiService: ApiService,
    private spinnerService: SpinnerService,
    private _snackBar: MatSnackBar
  ) { }

  openDialog(obj, callBack) {
    // const dialogRef = this.dialog.open(template, {
    //   disableClose: true,
    //   width: width ? width : '500px',
    //   height: 'auto',
    //   data: data ? data : null
    // });

    this.dialogRef = this.dialog.open(obj?.template, {
      disableClose: true,
      width: obj?.width ? obj?.width : '500px',
      height: 'auto',
      data: obj.data ? obj.data : null
    });

    this.dialogRef.afterClosed().subscribe(result => {
      callBack(result)
    });
  }

  hideDialog() {
    this.dialogRef.close()
  }
 
  snackBar(message, type) {
    const obj = {
      message : message,
      type: type
    }
    this._snackBar.openFromComponent(ToasterComponent, {
      duration: 1000,
      data: obj
    });
  }

   apiHandler(methodType, url, requestObj) {
     
    switch (methodType) {
      case HttpMethod.POST:
        return this.apiService.commonPostHandler(url, requestObj);
      case HttpMethod.PUT:
        return this.apiService.commonPutHandler(url, requestObj);
      case HttpMethod.DELETE:
        return this.apiService.commonDeleteHandler(url);
      case HttpMethod.GET:
        return this.apiService.commonGetHandler(url);
      case HttpMethod.GETWITHOUTHEADERS:
        return this.apiService.commonGetByWithoutHandler(url, requestObj);
    }
  }
  
  // common Post Api need to use in all screens
  commonApiCall(obj, callBack) {
    const requestObj = obj.requestObj || null;
    // obj.showPopup = obj.hasOwnProperty('showPopup') ? obj.showPopup : false;
    this.spinnerService.show();
    this.apiHandler(obj.methodType, obj.url, requestObj).pipe(take(1)).subscribe((res) => {
      if (res.statusCode === 1) {
        callBack(res, true);
        // if(obj.showPopup) {
        //   this.getMessages(res, AlertInfo.SUCCESS, obj.methodType);
        // }
      } else if(res.statusCode === 4) {
        callBack(res, 'showControlError');
      } else {
        this.spinnerService.hide();
        callBack(res, false);
        this.getMessages(res, AlertInfo.ERROR, obj.methodType);
      }
    }, (error) => {
      this.spinnerService.hide();
      this.snackBar(error, AlertInfo.ERROR);
    }
    );
  }

  private getMessages(res: any, type, methodType) {
    if (methodType == HttpMethod.GET && type == AlertInfo.SUCCESS) {
      return;
    }
    if (
      !checkNullOrUndefined(res.message) &&
      res.message != ''
    ) {
      this.snackBar(res.message, type);
    }
  }
  
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkNullOrUndefined(val) {
    if (val === null || val === undefined) {
      return true;
    } else {
      return false;
    }
  }

  clearStorage() {
    localStorage.clear();
  }

  getYears(startYear, year?) {
    var currentYear =  year ? year + new Date().getFullYear() : new Date().getFullYear();
    var years = [];
    startYear = startYear || 1980;  
    while ( startYear <= currentYear ) {
        years.unshift(startYear++);
    }   
    return years;
  }

  counter(i: number) {
    return new Array(i);
  }

  getFileExtension(file) {
    return file && file.split('.').pop();
  }

  getFileName(file) {
    return file && file.split('/').pop();
  }
  
  convertHtmlToString(str) {
    return str.replace(/(<([^>]+)>)/gi, "");
  }



  getTimeDifference(time) {

    let diffInMilliSeconds = Math.abs(new Date().getTime() - new Date(time).getTime()) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    if(days > 0) {
      return `${days} days`;
    }
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    if(hours > 0) {
      return `${hours} hours`;
    }
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    if(minutes > 0) {
      return `${minutes} minutes`;
    }
    diffInMilliSeconds -= minutes * 60;

     // calculate sec
     const sec = Math.floor(diffInMilliSeconds / 60) % 60;
     return `Just now`;

    // let difference = '';
    // if (days > 0) {
    //   difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    // }

    // difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    // difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 
  }
  
}
