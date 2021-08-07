import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserManagementComponent } from '../../../block/user-management/user-management.component';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginData: any;

  setActiveFlag: string

  employeeName: string;

  constructor(private commonService: CommonService, private router: Router) {

    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    if(this.loginData.name) {
      this.employeeName = this.loginData.name.trim().split(" ").map(res => res.charAt(0).toUpperCase()).join('');
    }

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          if(event.url) {
           this.setActiveFlag = this.setActive(event.url);
          }
      }

      // if (event instanceof NavigationError) {
      //     // Hide loading indicator

      //     // Present error to user
      // }

   });

  }

  ngOnInit(): void {
    
  }

  setActive(e) {
    switch (true) {
      case e.includes('home'):
          return 'home'
      case e.includes('manage-job'):
        return 'manage-job'
      case e.includes('jobpost'):
        return 'jobpost'
        case e.includes('resume'):
          return 'resume'
          case e.includes('report'):
            return 'report'
      default:
        return ''
   }
  }

  openProfile(e) {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    if(this.loginData.id === 0) {
      this.router.navigateByUrl('/auth/employeer/create-companyProfile');
      return
    }
    if(e === 'companyProfile') {
      this.router.navigateByUrl('/auth/employeer/companyProfile-overview');
    } else if(e === 'editProfile'){
      this.router.navigateByUrl('/auth/employeer/update-companyProfile');
    }
  }

  logout() {
    this.router.navigateByUrl('');
    this.commonService.clearStorage();
  }

}
