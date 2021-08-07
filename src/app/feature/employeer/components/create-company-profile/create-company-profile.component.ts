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
let Quill: any = QuillNamespace;
// import ImageResize from "quill-image-resize-module";
// Quill.register("modules/imageResize", ImageResize);


@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.scss']
})
export class CreateCompanyProfileComponent implements OnInit, OnDestroy {

  editorModules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
        ["Resize", "DisplaySize", "Toolbar"],
        ['emoji'],
      ],
    }
    // autoLink: true,
  };

  // login form model
  profileForm: FormGroup;
  employerRecruitersForm: FormGroup;
  companyLogoForm: FormGroup;

  // to show input error messgae
  submitted = false;

  // to open expansion pannel
  step = 0;

  countryList = [];
  stateList = [];
  cityList = [];
  getAllJobTitlesList = [];
  image: string;
  updateProfile = false;

  fileExtension = ['png', 'jpg', 'jpeg'];

  showControls = false;
  constructor(

    private fb: FormBuilder,
    public commonService: CommonService,
    private appService: AppService,
    private route: Router,
    private router: ActivatedRoute,
    private spinnerService: SpinnerService

  ) {

    if ((router.snapshot.routeConfig.path === 'update-companyProfile')) {
      this.updateProfile = true;
    }
    this.profileFormModel();
    this.getAllJobTitles();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  profileFormModel() {

    this.employerRecruitersForm = this.fb.group({
      employerId: [''],
      recruiterId: [''],
      contactPersonName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      mobileNo: ['', Validators.compose([Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      mountryCode: ['+1'],
      jobTitle: [''],
    })

    this.profileForm = this.fb.group({
      employerId: [''],
      companyName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
      companyWebSite: ['', Validators.required],
      description: ['', Validators.required],
      mobileNo: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      countryCode: ['+1', Validators.required],
      alternateMobileNo: ['', Validators.compose([Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      alternateCountryCode: ['+1'],
      industryType: ['', Validators.required],
      industryTypeName: ['', Validators.required],
      countryId: [231, Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      // zipCode: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{100}$")])],
      zipCode: ['', Validators.required],
      mapLocationLink: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      facebookLink: [''],
      twitterLink: [''],
      linkedInLink: [''],
    });

    this.companyLogoForm = this.fb.group({
      employerId: [''],
      companyLogo: [''],
    });
  }

  imageUrl(img) {
    this.image = img;
  }

  getAllJobTitles() {
    const url = `${this.appService.getAllJobTitles}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.getEmployerDetails();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.getAllJobTitlesList = res.data;
      }
      if (this.profileForm.get('stateId').value) {
        this.citySelected();
      }
    }));
  }


  getEmployerDetails() {
    const url = `${this.appService.getEmployerDetails}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
        this.getCountrys();
        if (statusFlag && res && res.hasOwnProperty('data')) {
          if (!this.updateProfile) {
            this.profileForm.patchValue({
              companyName: res.data.companyName,
              companyWebSite: res.data.companyWebSite,
              email: res.data.email,
              mobileNo: res.data.mobileNo
            });
          } else {
            this.profileForm.patchValue(res.data)
          }
          if(res.data.industryType && res.data.industryType !== 'IT') {
            this.profileForm.patchValue({
              industryTypeName: res.data.industryType,
              industryType: 'Others'
            })
          }
          if (res.data.contactPerson.length) {
            this.employerRecruitersForm.patchValue(res.data.contactPerson[0]);
            this.employerRecruitersForm.patchValue({
              employerId: res.data.employerId,
            });
          }
          this.companyLogoForm.patchValue({
            employerId: res.data.employerId,
            companyLogo: res.data.companyLogoPath,
          });
          this.image = res.data.companyLogoPath ? `${this.appService.domain}${res.data.companyLogoPath}` : null;

        }
      }
    );
  }

  getCountrys() {
    const url = `${this.appService.getCountrys}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.countryList = res.data;
      }
      if (this.profileForm.get('countryId').value) {
        this.stateSelected();
      } else {
        this.showControls = true
      }
    }));
  }


  stateSelected(event?) {
    if(event) {
      this.setAutoCompleteValues('profileForm', 'countryId', 'id', event)
    }
    this.stateList = [];
    const url = `${this.appService.getStatesByCountryID}?CountryID=${this.profileForm.get('countryId').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.stateList = res.data;
      }
      if (this.profileForm.get('stateId').value) {
        this.citySelected();
      } else {
        this.showControls = true
      }
    }));
  }

  citySelected(event?) {
    if(event) {
      this.setAutoCompleteValues('profileForm', 'stateId', 'id', event)
    }
    this.cityList = [];
    const url = `${this.appService.getCitiesByStateID}?StateID=${this.profileForm.get('stateId').value}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.cityList = res.data;
      }
      this.showControls = true
    }));
  }

   // autocomplete update
   setAutoCompleteValues(form, key, id, value) {
    this[form].patchValue({
      [key]: value ? value[id] : ''
    })
  }


  updateEmployerDetails() {
    this.submitted = true;
    if(this.profileForm.value.industryType == 'IT') {
      this.profileForm.get('industryTypeName').disable();
    }
    if (this.profileForm.invalid) {
      return;
    }
    if(this.profileForm.value.industryType == 'Others') {
      this.profileForm.get('industryTypeName').enable();
      this.profileForm.patchValue({
        industryType: this.profileForm.value.industryTypeName
      })
    }
    const url = `${this.appService.updateEmployerDetails}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.PUT,
      requestObj: this.profileForm.value
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.cityList = res.data;
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
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.cityList = res.data;
      }
    }));
  }

  onFileChange(file) {
    this.companyLogoForm.patchValue({
      companyLogo: file
    })
    if (this.updateProfile) {
      this.updateEmployerLogo();
    }
  }


  updateEmployerLogo() {
    const url = `${this.appService.updateEmployerLogo}`
    var formData: any = new FormData();
    formData.append('companyLogo', this.companyLogoForm.get('companyLogo').value[0]);
    formData.append("employerId", this.companyLogoForm.get('employerId').value);
    const apiObj = {
      url: url,
      methodType: HttpMethod.PUT,
      requestObj: formData
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.cityList = res.data;
      }
    }));
  }



  clearLogo() {
    this.image = null;
    this.companyLogoForm.patchValue({
      companyLogo: null
    })
  }


  submitForm() {
    this.submitted = true;
    if(this.profileForm.value.industryType == 'IT') {
      this.profileForm.get('industryTypeName').disable();
    }
    if (this.profileForm.invalid || this.employerRecruitersForm.invalid) {
      return;
    }
    if(this.profileForm.value.industryType == 'Others') {
      this.profileForm.get('industryTypeName').enable();
      this.profileForm.patchValue({
        industryType: this.profileForm.value.industryTypeName
      })
    }
    var formData: any = new FormData();
    formData.append('companyName', this.profileForm.get('companyName').value);
    formData.append("email", this.profileForm.get('email').value);
    formData.append("companyWebSite", this.profileForm.get('companyWebSite').value);
    formData.append("description", this.profileForm.get('description').value);
    formData.append("mobileNo", this.profileForm.get('mobileNo').value);
    formData.append("countryCode", this.profileForm.get('countryCode').value);
    if(this.profileForm.get('alternateMobileNo').value) {
      formData.append("alternateMobileNo", this.profileForm.get('alternateMobileNo').value);
    }
    formData.append("alternateCountryCode", this.profileForm.get('alternateCountryCode').value);
    formData.append("industryType", this.profileForm.get('industryType').value);
    formData.append("countryId", this.profileForm.get('countryId').value);
    formData.append("stateId", this.profileForm.get('stateId').value);
    formData.append("cityId", this.profileForm.get('cityId').value);
    formData.append("zipCode", this.profileForm.get('zipCode').value);
    formData.append("address1", this.profileForm.get('address1').value);
    formData.append("address2", this.profileForm.get('address2').value);
    if(this.profileForm.get('mapLocationLink').value) {
      formData.append("mapLocationLink", this.profileForm.get('mapLocationLink').value);
    }
    if(this.profileForm.get('facebookLink').value) {
      formData.append("facebookLink", this.profileForm.get('facebookLink').value);
    }
    if(this.profileForm.get('twitterLink').value) {
      formData.append("twitterLink", this.profileForm.get('twitterLink').value);
    }
    if(this.profileForm.get('linkedInLink').value) {
      formData.append("linkedInLink", this.profileForm.get('linkedInLink').value);
    }
    formData.append("companyLogo", this.companyLogoForm.get('companyLogo').value);
    formData.append("EmployerRecruiters[" + 0 + "].contactPersonName", this.employerRecruitersForm.get('contactPersonName').value);
    formData.append("EmployerRecruiters[" + 0 + "].email", this.employerRecruitersForm.get('email').value);
    if(this.employerRecruitersForm.get('mobileNo').value) {
      formData.append("EmployerRecruiters[" + 0 + "].mobileNo", this.employerRecruitersForm.get('mobileNo').value);
    }
    if(this.employerRecruitersForm.get('jobTitle').value) {
      formData.append("EmployerRecruiters[" + 0 + "].jobTitle", this.employerRecruitersForm.get('jobTitle').value);
    }
    const url = `${this.appService.saveEmployerDetails}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: formData
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag) {
        const data = JSON.parse(localStorage.getItem('loginData'));
        data.id = res.data.id;
        data.jobTitle = res.data.jobTitle;
        localStorage.setItem('loginData', JSON.stringify(data))
        this.route.navigateByUrl('/auth/employeer/companyProfile-overview');
      }
    }));
  }

  clrearForm() {
    this.profileForm.reset();
    this.employerRecruitersForm.reset();
  }



}
