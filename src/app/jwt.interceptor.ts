import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CommonService } from './core/services/common.service';
import { AppService } from './core/services/app.service';
import { SpinnerService } from './core/services/spinner.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  currentUser: any;

  constructor(
    private commonService: CommonService, 
    private appService: AppService, 
    private router: Router,
    private spinnerService: SpinnerService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      this.spinnerService.hide();
      const error = (err&&err.error)  ? err.error.message || err.statusText : 'error occured';
      if (err.status !== 401) {
        return throwError(error);
      }
      this.commonService.clearStorage();
      this.commonService.snackBar('Session Experied', 'error')
      this.router.navigateByUrl('')
      return throwError(error);
    }))
  }
}
