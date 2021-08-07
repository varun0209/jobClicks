import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../core/services/common.service';
import { EmployeerLoginComponent } from './employeer/employeer-login/employeer-login.component';
import { LoginComponent } from './jobSeeker/login/login.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<UserManagementComponent>
    ) { }

  ngOnInit(): void {
  }

  loginJobSeeker() {
    this.dialogRef.close()
    this.commonService.openDialog({ template: LoginComponent}, (res) => { }) 
  }

  loginEmployeer() {
    this.dialogRef.close()
    this.commonService.openDialog({ template: EmployeerLoginComponent}, (res) => { })
  }

}
