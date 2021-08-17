import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }


  domain = 'http://137.59.201.54:82/';

  loginEmployee = `${this.domain}api/Login/employee`;
  empRegister = `${this.domain}api/registration/employee`;
  employeeVerifyEmail = `${this.domain}api/registration/EmployeeVerifyEmail`;
  employeeForgotPwd = `${this.domain}api/registration/EmployeeForgotPassword`;
  uploadResumeAndCoverLater = `${this.domain}api/employee/UploadResumeAndCoverLater`;

  loginEmployer = `${this.domain}api/Login/employer`;
  employerRegister = `${this.domain}api/registration/employer`;
  employerVerifyEmail = `${this.domain}api/registration/EmployerVerifyEmail`;
  employerForgotPwd = `${this.domain}api/registration/EmployerForgotPassword`;
  resetPassword = `${this.domain}api/registration/ResetPassword`;


  resendVerification = `${this.domain}api/registration/ResendEmailVerification`;
  verifyOTP = `${this.domain}api/registration/VerifyOTP`;
  resendOTP = `${this.domain}api/registration/ResendOTP`;

  // company profile
  saveEmployerDetails = `${this.domain}api/employer/SaveEmployerDetails`;
  savejobdata = `${this.domain}api/employer/SaveJobDetails`;
  getCountrys = `${this.domain}api/employee/GetCountrys`;
  getStatesByCountryID = `${this.domain}api/employee/GetStatesByCountryID`;
  getCitiesByStateID = `${this.domain}api/employee/GetCitiesByStateID`;
  getalldropdownlist = `${this.domain}api/employee/GetEmployeeProfileDropdownData`;
  getalldropdownlistpostjobs = `${this.domain}api/employer/GetEmployerPostJobsDropdownData`;
  getJobDetailsEmpByJobId = `${this.domain}api/employer/GetJobDetailsByJobId`;
  getEmployerDetails = `${this.domain}api/employer/GetEmployerDetails`;
  updateEmployerDetails = `${this.domain}api/employer/UpdateEmployerDetails`;
  updatejobdeatils = `${this.domain}api/employer/UpdateJobDetails`;
  updateEmployerLogo = `${this.domain}api/employer/UpdateEmployerLogo`;
  saveAndUpdateEmployerRecruiter = `${this.domain}api/employer/SaveAndUpdateEmployerRecruiter`;
  updateJobCompanyDetails = `${this.domain}api/employer/UpdateJobCompanyDetails`;

  

  // ***************************************** employee ************************************//

  // myprofile
  getEmployeeDatabyUserID = `${this.domain}api/employee/GetEmployeeDatabyUserID`;
  saveEmployeeDetails = `${this.domain}api/employee/CreateEmployeeProfile`;
  removeEmployeeEducation = `${this.domain}api/employee/RemoveEmployeeEducation`;
  removeEmployeeSkill = `${this.domain}api/employee/RemoveEmployeeSkill`;
  removeEmployeeWorkExperience = `${this.domain}api/employee/RemoveEmployeeWorkExperience`;
  removeEmployeeCertification = `${this.domain}api/employee/RemoveEmployeeCertification`;

  updateEmployeedata = `${this.domain}api/employee/UpdateEmployeedata`;
  updateEmployeeJobInformationdata = `${this.domain}api/employee/UpdateEmployeeJobInformationdata`;
  saveEmployeeSkillsData = `${this.domain}api/employee/SaveEmployeeSkillsData`;
  saveEmployeeEducationData = `${this.domain}api/employee/SaveEmployeeEducationData`;
  saveEmployeeWorkExperienceData = `${this.domain}api/employee/SaveEmployeeWorkExperienceData`;
  
  
  updateEmployeeFiles = `${this.domain}api/employee/UpdateEmployeeFiles`;
  removeEmployeeFiles = `${this.domain}api/employee/RemoveEmployeeFiles`;
  saveEmployeeCertificationData = `${this.domain}api/employee/SaveEmployeeCertificationData`;

  // verify email
  verifyEmployeeEmail = `${this.domain}api/employee/VerifyEmployeeEmail`;
  updateEmployeeEmail = `${this.domain}api/employee/UpdateEmployeeEmail`;

  // verify phone
  updateMobileNumber = `${this.domain}api/employee/UpdateMobileNumber`;
  
  // search jobs
  // getAllSkills = `${this.domain}api/employee/GetAllSkills`;
  getAllJobTitles = `${this.domain}api/employee/GetAllJobTitles`;

  // getAllCitieandStates = `${this.domain}api/employee/GetAllCitieandStates`;
  // getAllJobTitleandSkills = `${this.domain}api/employee/GetAllJobTitleandSkills`;

  getJobSearchDropdownData = `${this.domain}api/employee/GetJobSearchDropdownData`;
  searchJobs = `${this.domain}api/employee/SearchJobs`;
  getJobDetailsbyJobId = `${this.domain}api/employee/GetJobDetailsbyJobId`;
  skipAndApplyPosition = `${this.domain}api/employee/SkipAndApplyPosition`;
  applyJobsinEmployee = `${this.domain}api/employee/ApplyJobsinEmployee`;
  getAllApplyedJobDetails = `${this.domain}api/employee/GetAllApplyedJobDetails`;

  // manage jobs
  getAllEmployeeJobAlerts = `${this.domain}api/employee/GetAllEmployeeJobAlerts`;
  createEmployeeJobAlert = `${this.domain}api/employee/CreateEmployeeJobAlert`;
  updateEmployeeJobAlert = `${this.domain}api/employee/UpdateEmployeeJobAlert`;
  deleteSelectedEmployeeJobAlert = `${this.domain}api/employee/DeleteSelectedEmployeeJobAlert`;  

  // job alerts
  getJobsBasedonJobAlertbyEmployeeID = `${this.domain}api/employee/GetJobsBasedonJobAlertbyEmployeeID`;  
  
  // ***************************************** employer ************************************//

  // manage jobs
  getAllJobDetails = `${this.domain}api/employer/GetAllJobDetails`;
  updateJobStatus = `${this.domain}api/employer/UpdateJobStatus`;
  getJobDetailsByJobId = `${this.domain}api/employer/GetJobDetailsByJobId`;

 // verify email
 verifyEmployerEmail = `${this.domain}api/employer/VerifyEmployerEmail`;
 updateEmployerEmail = `${this.domain}api/employer/UpdateEmployerEmail`;

 // verify phone
 updateEmployerMobileNumber = `${this.domain}api/employer/UpdateMobileNumber`;
 


  









}
