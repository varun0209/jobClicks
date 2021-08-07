import { Component, OnInit } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { CommonService } from '../../core/services/common.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  setActiveFlag: string

  constructor(private commonService: CommonService, private router: Router) {
    
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

  showLoginRegistor() {
        this.commonService.openDialog({ template: UserManagementComponent }, (res) => {})

  }

  setActive(e) {
    switch (true) {
      case e.includes('home'):
          return 'home'
          case e.includes('find-Job'):
            return 'find-Job'
      case e.includes('blog'):
        return 'blog'
      default:
        return 'home'
   }
  }

  showRoute(route) {
    this.router.navigateByUrl(route)
  }


}
