import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../core/services/common.service';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { MustMatch } from '../../../../core/services/confirmed.validator';
import { SpinnerService } from '../../../../core/services/spinner.service';

import * as QuillNamespace from "quill";
import { ActivatedRoute, Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
let Quill: any = QuillNamespace;
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {

  @Output() previewjobpost = new EventEmitter()
  panelOpenState = false;
  // postjobupdatedeatils:any = [];
  jobtitlename: string;
  jobtitleid: number;
  selectedjobid: number;

  type_list: string[];
  skills = [];
  travelrequirment:boolean = false;
  receiveresponseemail:boolean = false;
  showControls = false;

  editorModules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        // ["blockquote", "code-block"],
        // [{ script: "sub" }, { script: "super" }],
        // [{ indent: "-1" }, { indent: "+1" }],
        // [{ size: ["small", false, "large", "huge"] }],
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
        // ["clean"],
        // ["link", "image", "video"],
        // ["Resize", "DisplaySize", "Toolbar"],
        // ['emoji'],
      ],
    }
    // autoLink: true,
  };

  // login form model
  profileForm: FormGroup;
  postjobForm: FormGroup;
  postjobcompanydata: FormGroup;
  employerRecruitersForm: FormGroup;
  companyLogoForm: FormGroup;

  // to show input error messgae
  submitted = false;


  // to open expansion pannel
  step = 0;

  stateList = [];
  cityList = [];
  getalldropdownlistpost: any;

  companydata:any =[];
  jobdeatils:any =[];
  recruiterdata:any =[];
  image: string;
  updateProfile = false;


  constructor(

    private fb: FormBuilder,
    public commonService: CommonService,
    private appService: AppService,
    private route: Router,
    private router: ActivatedRoute,
    private spinnerService: SpinnerService

  ) {
    this.profileFormModel();
    if ((router.snapshot.routeConfig.path.includes('update-post-job'))) {
      this.updateProfile = true;
    }

  }

  backManageJob() {
    this.route.navigateByUrl('/auth/employeer/manage-job');
  }

  ngOnInit(): void {
    this.router.params.subscribe(res => {
    this.getalldropdownlistpostjobs(res);
    })
  }

  ngOnDestroy(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  get getValue() {
    return this.postjobcompanydata.get('receiveResponseToEmail')
  }

  profileFormModel() {

    this.postjobForm = this.fb.group({
      jobId:[0],
      employerId: [0],
      industryType: ['', Validators.required],
      industryTypeName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      rolesAndResponsibilities: ['', Validators.required],
      description: ['', Validators.required],
      keySkills: ['', Validators.required],
      employementType: [''],
      minExperience:[''],
      maxExperience:  [''],
      salary:[''],
      salaryHide:[false],
      location:[''],
      jobVacancies: [null],
      education:[''],
      remoteOption:[''],
      receiveResponseToEmail:[false],
      responseEmail:[''],
      remoteOptionId:[null],
      salaryId: [null],
      employmentTypeId:[null],
      educationId:[null],
      travelRequirement:[false],
      hideSalary:[false]
     
    });


    this.employerRecruitersForm = this.fb.group({
      employerId: [''],
      recruiterId: [0],
      contactPersonName: [''],
      email: [''],
      countryCode: ['+1'],
      mobileNo: [''],
      jobTitle: [''],
    })


    this.postjobcompanydata = this.fb.group({
      jobCompanyId:[0],
      employerId: [''],
      description: [''],
      companyName: [''],
      companyType: [''],
      companyWebSite: [''],
      email: ['', Validators.compose([ Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
      mobileNo: ['', Validators.compose([ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      countryCode: ['+1'],
      country: ['United States of America'],
      countryId: [231],
      stateId: [''],
      state: [''],
      cityId: [''],
      city: [''],
      companyLogoPath: [''],
      // zipCode: ['',Validators.compose([Validators.pattern("^((\\+91-?)|0)?[0-9]{100}$")])],
      zipCode: [''],
      address1: [''],
      address2: [''],
      receiveResponseToEmail: [false],
      responseEmail:[''],
      mapLocationLink: [''],
      facebookLink: [''],
      twitterLink: [''],
      linkedInLink: ['']

    });
  }

  imageUrl(img) {
    this.image = img;
  }

  counter(i: number) {
    return new Array(i);
  }

  // autocomplete update
  setAutoCompleteValues(form, key, id, value) {
    this[form].patchValue({
      [key]: value[id]
    })
  }

  valueSelectedEmit(event) {
    this.postjobForm.patchValue({
      keySkills: event
    })
  }

  selectMax() {
    this.postjobForm.controls['maxExperience'].setErrors(null);
    this.postjobForm.controls['minExperience'].setErrors(null);
    if(!this.postjobForm.get('minExperience').value) {
      this.postjobForm.controls['minExperience'].setErrors({'min': true});
    }
    if(this.postjobForm.get('maxExperience').value && (+this.postjobForm.get('minExperience').value > +this.postjobForm.get('maxExperience').value)) {
      this.postjobForm.controls['maxExperience'].setErrors({'max': true});
    }
  }

  changeReceiveEmail() {
    this.postjobcompanydata.patchValue({
      responseEmail: ''
    })
  }

  getalldropdownlistpostjobs(resp) {
    const url = `${this.appService.getalldropdownlistpostjobs}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, (res, statusFlag) => {
        if (statusFlag && res && res.hasOwnProperty('data')) {
          this.getalldropdownlistpost = res.data;
         }
      if (resp.hasOwnProperty('jobId') && resp.jobId) {
        this.selectedjobid = resp.jobId;
        this.getJobDetailsEmpByJobId();
      } else {
        this.getEmployerDetails();
      }
      }
    );
  }

  getEmployerDetails() {
    const url = `${this.appService.getEmployerDetails}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
        if (statusFlag && res && res.hasOwnProperty('data')) {
            this.postjobcompanydata.patchValue(res.data);
          if (res.data.contactPerson.length) {
            // this.employerRecruitersForm.patchValue(res.data.contactPerson[0]);
            this.employerRecruitersForm.patchValue({
              countryCode: '+1',
              employerId: res.data.employerId
            });
            this.postjobForm.patchValue({
              employerId: res.data.employerId
            })
          }
          if(this.postjobcompanydata.get('country').value) {
            this.stateSelected();
          }
          this.spinnerService.hide();
          this.showControls = true;
        }
      }
    );
  }
  
  stateSelected(event?) {
    if(event) {
      this.setAutoCompleteValues('postjobcompanydata', 'country', 'name', event)
    }
    this.stateList = [];
    const url = `${this.appService.getStatesByCountryID}?CountryID=${this.postjobcompanydata.get('countryId').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.stateList = res.data;
      }
      if (this.postjobcompanydata.get('state').value) {
        this.citySelected();
      }
    }));
  }

  citySelected(event?) {
    if(event) {
      this.setAutoCompleteValues('postjobcompanydata', 'state', 'name', event)
    }
    const country = this.stateList.find(res => res.name == this.postjobcompanydata.get('state').value);
    this.postjobcompanydata.patchValue({
      stateId: country.id
    })
    this.cityList = [];
    const url = `${this.appService.getCitiesByStateID}?StateID=${this.postjobcompanydata.get('stateId').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.cityList = res.data;
      }
    }));
  }

  getJobDetailsEmpByJobId(){
    const url = `${this.appService.getJobDetailsEmpByJobId}?jobId=${this.selectedjobid}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, (res, statusFlag) => {
      if(statusFlag) {
        this.postjobForm.patchValue(res.data.jobs[0]);
        const job = res.data.jobs[0].keySkills ? res.data.jobs[0].keySkills.split(',') : []
        this.postjobForm.patchValue({
          keySkills: typeof job === 'string' ? [job] : job
        })
        if(res.data.jobs[0].industryType && res.data.jobs[0].industryType !== 'IT') {
          this.postjobForm.patchValue({
            industryTypeName: res.data.jobs[0].industryType,
            industryType: 'Others'
          })
        }
        this.employerRecruitersForm.patchValue(res.data.contactPerson[0]);
        this.postjobcompanydata.patchValue(res.data);
        this.postjobcompanydata.patchValue({
          employerId: +res.data.jobs[0].employerId,
          receiveResponseToEmail: res.data.jobs[0].receiveResponseToEmail ? 'true' : 'false',
          responseEmail: res.data.jobs[0].responseEmail
        })
        this.employerRecruitersForm.patchValue({
          countryCode: '+1',
          employerId: +res.data.jobs[0].employerId
        });
        if(this.postjobcompanydata.get('country').value) {
          this.stateSelected();
        }
        this.spinnerService.hide();
        this.showControls = true;
      }
    })
  }
  

  submitForm() {
    this.submitted = true;
    if(this.postjobForm.value.industryType == 'IT') {
      this.postjobForm.get('industryTypeName').disable();
    }
    if (this.postjobForm.invalid || this.employerRecruitersForm.invalid || this.postjobcompanydata.invalid) {
      return;
    }
    if(this.postjobForm.value.industryType == 'Others') {
      this.postjobForm.get('industryTypeName').enable();
      this.postjobForm.patchValue({
        industryType: this.postjobForm.value.industryTypeName
      })
    }
    this.postjobForm.patchValue({
      keySkills: this.postjobForm.value.keySkills && this.postjobForm.value.keySkills.length ? this.postjobForm.value.keySkills.join(',') : ''
    })
    // if(this.postjobForm.value.travelrequirments === true){
    //     this.travelrequirment = true;
    // }else{
    //   this.travelrequirment = false;
    // }

    // if(this.postjobcompanydata.value.receiveResponseToEmail === true){
    //   this.receiveresponseemail = true;
    // }else{
    // this.receiveresponseemail = false;
    // }
    this.postjobcompanydata.value.receiveResponseToEmail = this.postjobcompanydata.value.receiveResponseToEmail == 'true' ? true : false
    this.postjobForm.value.receiveResponseToEmail = this.postjobcompanydata.value.receiveResponseToEmail;
    this.postjobForm.value.responseEmail = this.postjobcompanydata.value.responseEmail;

    const data = {
      postjobData: this.postjobForm.value,
      contactPersonData: this.employerRecruitersForm.value,
      companyData: this.postjobcompanydata.value
    }

    this.previewjobpost.emit(data);

    const job = this.postjobForm.value.keySkills
    this.postjobForm.patchValue({
      keySkills: typeof job === 'string' ? [job] : job
    })
  }

  updateJobDetails() {
    this.submitted = true;
    if(this.postjobForm.value.industryType == 'IT') {
      this.postjobForm.get('industryTypeName').disable();
    }
    if (this.postjobForm.invalid) {
      return;
    }
    if(this.postjobForm.value.industryType == 'Others') {
      this.postjobForm.get('industryTypeName').enable();
      this.postjobForm.patchValue({
        industryType: this.postjobForm.value.industryTypeName
      })
    }
    this.postjobForm.patchValue({
      keySkills: this.postjobForm.value.keySkills && this.postjobForm.value.keySkills.length ? this.postjobForm.value.keySkills.join(',') : ''
    })
    const url = `${this.appService.updatejobdeatils}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.PUT,
      requestObj: this.postjobForm.value
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag) {
        const job = this.postjobForm.value.keySkills
        this.postjobForm.patchValue({
          keySkills: typeof job === 'string' ? [job] : job
        })
      }
    }));
  }

  saveAndUpdateEmployerRecruiter() {
    this.submitted = true;
    if (this.employerRecruitersForm.invalid) {
      return;
    }
    const url = `${this.appService.saveAndUpdateEmployerRecruiter}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: this.employerRecruitersForm.value
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.submitted = false;
      this.spinnerService.hide();
    }));
  }

  updateJobCompanyDetails() {
    this.submitted = true;
    if (this.postjobcompanydata.invalid) {
      return;
    }
    const url = `${this.appService.updateJobCompanyDetails}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.PUT,
      requestObj: this.postjobcompanydata.value
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.submitted = false;
      this.spinnerService.hide();
    }));
  }

  employmentType(event){
   const countryName = this.getalldropdownlistpost.employementType.find(item => item.employeementTypeName == event.currentTarget.value);
   this.postjobForm.patchValue({
    employmentTypeId: countryName.id,
  })
  }

  remoteoptionType(event){
    const remoteoptionsName = this.getalldropdownlistpost.remoteOptionMasters.find(item => item.remoteOptionId == event.currentTarget.value);
    this.postjobForm.patchValue({
      remoteOption: remoteoptionsName.remoteOptionName
    })
  }

  educationType(event){
    const educationName = this.getalldropdownlistpost.education.find(item => item.qualificationId == event.currentTarget.value);
    this.postjobForm.patchValue({
      education: educationName.qualificationName
    })
  }

  salaryType(event){
    const salaryName = this.getalldropdownlistpost.salaryRange.find(item => item.salaryId == event.currentTarget.value);
    this.postjobForm.patchValue({
      salary:salaryName.salaryRange
    })
  }

  

  clrearForm() {
    this.postjobForm.reset();
    this.employerRecruitersForm.reset();
    this.postjobcompanydata.reset();
  }
}
