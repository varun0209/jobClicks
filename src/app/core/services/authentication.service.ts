import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import jwt_decode from "jwt-decode";
import { Role } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: User = new User();
  public token: any;
  public userId: any;
  private adminNoPermissions: Array<{
    role: string;
    category: string;
    permitionTypes: Array<string>;
  }>;

  constructor(private route: Router) { 
    this.getUserDetails();

  }
  
  public get currentUser(): User {
    return this.user;
  }

  public logdin(token: any): void {
    if (token) {
      localStorage.setItem("A_accesstoken", token);
      
      this.getUserDetails();

    } else {
      this.user = new User();
      this.logout();
    }
  }

  public getUserDetails(){
    this.user = new User();
    const token =  localStorage.getItem("A_accesstoken");
    if (token) {
      const user = jwt_decode(token);
      this.user.username =
        user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      this.user.role =
        user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
  }

  public logout(): void {
    sessionStorage.removeItem('roles');
    sessionStorage.clear();
    localStorage.clear();
    this.user.role = '';
    this.user = new User();
    this.route.navigateByUrl("/");
  }

  public hasAccess(category: string, type: string): boolean {
    if (this.user.role === Role.SuperAdmin) {
      return true;
    }
    const restrictedPermition: {
      role: string;
      category: string;
      permitionTypes: Array<string>;
    } = this.adminNoPermissions.find(
      (_) => _.category === category && _.role === this.user.role
    );
    if (restrictedPermition) {
      return restrictedPermition.permitionTypes.indexOf(type) === -1;
    }
    return true;
  }
}
