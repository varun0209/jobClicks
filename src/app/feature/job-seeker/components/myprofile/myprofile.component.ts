import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../core/services/common.service';
import { AppService } from '../../../../core/services/app.service';
import { HttpMethod } from '../../../../core/enums/http-handlers';
import { MustMatch } from '../../../../core/services/confirmed.validator';
import { SpinnerService } from '../../../../core/services/spinner.service';

import * as QuillNamespace from 'quill';
import { ActivatedRoute, Router } from '@angular/router';
import { YesOrNoComponent } from '../../../../shared/components/yes-or-no/yes-or-no.component';
import { MyprofileService } from './myprofile.service';
let Quill: any = QuillNamespace;

// export class CustomeDateValidators {
//   static fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidatorFn {
//       return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
//           const fromDate = formGroup.get(fromDateField).value;
//           const toDate = formGroup.get(toDateField).value;
//          // Ausing the fromDate and toDate are numbers. In not convert them first after null check
//           if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
//               return {[errorName]: true};
//           }
//           return null;
//       };
//   }
// }

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  providers: [MyprofileService]
})
export class MyprofileComponent implements OnInit {

  editorModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'],
        ['Resize', 'DisplaySize', 'Toolbar'],
        ['emoji'],
      ],
    },
    // autoLink: true,
  };

  // login form model
  employeePersonalinformationForm: FormGroup;
  employeeJobinformationForm: FormGroup;
  employeeworkexperienceForm: FormGroup;
  employeeEducationinformationForm: FormGroup;
  employeeSkillsinformationForm: FormGroup;
  employeeCertificationinformationForm: FormGroup;
  resumeCoverForm: FormGroup;
  profileForm: FormGroup;

  // to show input error messgae
  submitted = false;

  // to show others control
  showOthersControl = false;

  // to open expansion pannel
  step = 0;

  // dropdownliist
  getalldropdownlistData: any;
  countryList = [];
  stateList = [];
  cityList = [];

  image: string;
  updateProfile = false;
  loginData: any;

  showControls = false;

  fileExtension = ['png', 'jpg', 'jpeg'];
  fileExtensionResuemCover = ['doc', 'docx', 'pdf', 'PDF'];


  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    private appService: AppService,
    private route: Router,
    private router: ActivatedRoute,
    private spinnerService: SpinnerService,
    private myprofileService:MyprofileService
  ) {
    this.profilePersonalInformation();
    if (router.snapshot.routeConfig.path === 'edit-myprofile') {
      this.updateProfile = true;
    }
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    if(this.loginData.userId) {
       this.getEmployeeDetailsById();
    } else {
      this.route.navigateByUrl('')
    }
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  setStep(index: number, el?) {
    this.step = index;
    // if(el) {
    //   el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // }
    // el.scrollIntoView();

  }

  getForm(key, value): FormArray {
    return this[key].get(value) as FormArray
  }

  profilePersonalInformation() {
      //personal deatils
   this.employeePersonalinformationForm = this.fb.group({
    employeeId: [''],
    userId: [''],
    firstName: ['', Validators.required],
    lastName: ['',Validators.required],
    gender: [''],
    countryCode:['+1'],
    mobileNo: ['',Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
    alternateMobileNo: ['',Validators.compose([ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
    alternatecountryCode:['+1'],
    email: ['',Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
    address: [''],
    address2: [''],
    country: ['United States of America'],
    city: [''],
    state: [''],
    // zipCode: ['', Validators.compose([Validators.pattern("^((\\+91-?)|0)?[0-9]{100}$")])],
    zipCode: [''],
    nationality: [''],
    workAuthorizationId: [''],
    veterans: [false],
    differentlyAbled: [false],
    others: ['']
   });

  }

  profileFormModel() {

   
   //job information deatils
   this.employeeJobinformationForm = this.fb.group({
    employeeId: [''],
    userId: [''],
    employeeTypeId: [''],
    jobTitle: [''],
    salaryId: [''],
    willingToRelocate:[''],
    willingToTravel: [''],
    preferredLocation: [''],
    noticePeriodId: [''],
    lookingForJob: [false],
    
   });

   // Work Experience deatils
   this.employeeworkexperienceForm = this.fb.group({
    employeeInfomation: this.fb.array([
      this.jobInformationModel()
    ])
   });

   // Education deatils
   this.employeeEducationinformationForm = this.fb.group({
    employeeeducationInfomation: this.fb.array([
     this.EducationInformationModel()
    ])
   });

   // Skills deatils
   this.employeeSkillsinformationForm = this.fb.group({
    employeeskillInfomation: this.fb.array([
    this.skillInformationModel()
    ])
   });

   // Certification deatils
   this.employeeCertificationinformationForm = this.fb.group({
    employeecertificatInfomation: this.fb.array([
      this.certificationInformationModel()
      ])
   });

    this.resumeCoverForm = this.fb.group({
      resume: [''],
      coverlater:['']
    });

    this.profileForm = this.fb.group({
      profile: ['']
    });
  }

  // job information model
  jobInformationModel() {
     return this.fb.group({
      employeeId: [this.employeePersonalinformationForm.get('employeeId').value],
      experienceId: [0],
      jobTittle: [''],
      clientName: [''],
      projectDescription: [''],
      startDate: [''],
      endDate: [''],
      currentlyWorking: [false],
      trackingId: this.generateUniqueId()
     });
  }

  //Education information model
  EducationInformationModel() {
    return this.fb.group({
    employeeId: [this.employeePersonalinformationForm.get('employeeId').value],
    qualificationId: [''],
    educationId: [0],
    specialization: [''],
    universityName: [''],
    yearOfPassing: [''],
    higherEducation: [''],
     trackingId: this.generateUniqueId()
    });
 }

 // skills information model
  skillInformationModel(){
    return this.fb.group({
      skillId: [0],
      employeeId: [this.employeePersonalinformationForm.get('employeeId').value],
      skillName: [''],
      experience: [0],
      totalexperienceyear: [0],
      totalexperiencemonth: [0],
      lastUsedYear: [''],
      trackingId: this.generateUniqueId()
    });
  }

  // certification Information Model
  certificationInformationModel(){
    return this.fb.group({
      certificationId: [''],
      employeeId: [this.employeePersonalinformationForm.get('employeeId').value],
      certificationName: [''],
      issuedDate: [''],
      issuedBy: [''],
      validUpTo: [''],
      certificationImagePath:[''],
      certification:[''],
     trackingId: this.generateUniqueId()
    });
  }

  generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  updateItem(form, value, method?, index?) {   
    this.submitted = false
    if(this[form].invalid) {
      this.submitted = true
      return
    } 
    if(form === 'employeePersonalinformationForm') {
      let others = ''
      others = this.employeePersonalinformationForm.get('veterans').value ? 'veterans' : ''
      value.others = others;
    } else if(form === 'employeeSkillsinformationForm') {
      const totalYear = value.totalexperienceyear+ '.' + value.totalexperiencemonth;
      value.experience = +totalYear
    } else if(form === 'employeeEducationinformationForm') {
      this.employeeEducationinformationForm.patchValue({
        higherEducation: index == 0 ? true : false
      })
      value.higherEducation = index == 0 ? true : false
    }
    const data = {
      key: form,
      requestObj: value
    }
    this.myprofileService.updateItem(data, method)
  }


  addItem(form, key, method) {
    // add item to the list
    const control = <FormArray>this[form].controls[key];
    control.push(this[method]());
  }

  updateJobTitleAutoComplete(value, i) {
    (<FormArray>this.employeeworkexperienceForm.controls['employeeInfomation']).at(i).patchValue({
      jobTittle: value['jobTitle']
    });
  }

  addItemValues(form, key, method, array) {
    let item = this[form].get(key) as FormArray;
    item.clear()
      for (let a = 0; a < array.length; a++) {
        let itemData = this[form].get(key) as FormArray;
        const data = this[method]();
        data.patchValue(array[a])
        itemData.push(data);
      }
  }


  removeItem(form,key,i, values, name) {
    // remove item from the list
    // const obj = {
    //   yes: 'Delete',
    // }
    // this.commonService.openDialog(YesOrNoComponent, obj, null, (res) => {
    //   if(res) {
        if(this.updateProfile && values[name]) {
          const obj = { form: form,  key: key, index: i, value: values[name] }
          this.myprofileService.removeItem(obj, (res) => {
            if(res) {
              const control = <FormArray>this[form].controls[key];
              control.removeAt(i);
            }
          })
        } else {
              const control = <FormArray>this[form].controls[key];
              control.removeAt(i);
        }
      // }
    // })
  }

  updateFormData(form,key,i) {

  }

  imageUrl(img) {
    this.image = img;
  }

  getEmployeeDetailsById() {
    const url = `${this.appService.getEmployeeDatabyUserID}?userid=${this.loginData.userId}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj,(res, statusFlag) => {
         this.getAlldropdownlist();
        if (statusFlag && res && res.hasOwnProperty('data')) {
          if (!this.updateProfile) {
            this.employeePersonalinformationForm.patchValue({
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              countryCode:'+1',
              mobileNo: res.data.mobileNo,
              email: res.data.email,
            });
            this.profileFormModel();
          } else {
            this.employeePersonalinformationForm.patchValue(res.data);
            const others = res.data.others && res.data.others.split(',');
            this.employeePersonalinformationForm.patchValue({
              veterans: others && others.some(res => res === 'veterans') ? true : false,
              differentlyAbled: others && others.some(res => res === 'differentlyAbled') ? true : false,
              workAuthorizationId: +res.data.workAuthorizationId
            });
            this.profileFormModel();


            this.employeeJobinformationForm.patchValue(res.data);
            this.employeeJobinformationForm.patchValue({
              noticePeriodId: +res.data.noticePeriodId
            })

            if(res.data.employeeCertifications && res.data.employeeCertifications.length) {
              res.data.employeeCertifications.map(resp => {
                resp.issuedDate = resp.issuedDate ? new Date(resp.issuedDate).toISOString().slice(0, 10) : undefined;
              })
              
              this.addItemValues('employeeCertificationinformationForm', 'employeecertificatInfomation', 'certificationInformationModel', res.data.employeeCertifications)
            }

            if(res.data.employeeEducations && res.data.employeeEducations.length) {
              this.addItemValues('employeeEducationinformationForm', 'employeeeducationInfomation', 'EducationInformationModel', res.data.employeeEducations)
            }

            if(res.data.employeeWorkExperiences && res.data.employeeWorkExperiences.length) {
                res.data.employeeWorkExperiences.map(resp => {
                  resp.startDate = resp.startDate ? new Date(resp.startDate).toISOString().slice(0, 10) : undefined;
                  resp.endDate = resp.endDate ? new Date(resp.endDate).toISOString().slice(0, 10) : undefined;
                })
              this.addItemValues('employeeworkexperienceForm', 'employeeInfomation', 'jobInformationModel', res.data.employeeWorkExperiences)
            }
            
            if(res.data.employeeSkills && res.data.employeeSkills.length) {
              res.data.employeeSkills.map(resp => {
                const experience = resp.experience && resp.experience.toString().split('.');
                resp.skillName = resp.skillName ? resp.skillName.split(',') : [];
                resp.totalexperienceyear = experience && experience[0] ? experience[0]: 0
                resp.totalexperiencemonth = experience && experience[1] ? experience[1] : 0
              })
              this.addItemValues('employeeSkillsinformationForm', 'employeeskillInfomation', 'skillInformationModel', res.data.employeeSkills)
            }


            this.employeeSkillsinformationForm.patchValue(res.data.employeeSkills);
            this.profileForm.patchValue({
              profile: res.data.profilePicPath
            })

            this.image = res.data.profilePicPath ? `${this.appService.domain}${res.data.profilePicPath}` : null;
            this.resumeCoverForm.patchValue({
              resume: res.data.resumePath ? res.data.resumePath : '',
              coverlater: res.data.coverLaterPath ? res.data.coverLaterPath : ''
            })

          }
        }
      }
    );
  }

  getAlldropdownlist() {
    const url = `${this.appService.getalldropdownlist}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, (res, statusFlag) => {
        this.getCountrys();
        if (statusFlag && res && res.hasOwnProperty('data')) {
          this.getalldropdownlistData = res.data;
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
      if (this.employeePersonalinformationForm.get('country').value) {
        this.stateSelected();
      } else {
        this.showControls = true
      }
    }));
  }

  stateSelected(event?) {
    if(event) {
      this.setAutoCompleteValues('employeePersonalinformationForm', 'country', 'name', event)
    }
    const list = this.countryList.find(res => res.name == this.employeePersonalinformationForm.get('country').value)
    this.stateList = [];
    const url = `${this.appService.getStatesByCountryID}?CountryID=${list.id}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.GET
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag && res && res.hasOwnProperty('data')) {
        this.stateList = res.data;
      }
      if (this.employeePersonalinformationForm.get('state').value) {
        this.citySelected();
      } else {
        this.showControls = true
      }
    }));
  }

  citySelected(event?) {
    if(event) {
      this.setAutoCompleteValues('employeePersonalinformationForm', 'state', 'name', event)
    }
    const list = this.stateList.find(res => res.name == this.employeePersonalinformationForm.get('state').value)
    this.cityList = [];
    const url = `${this.appService.getCitiesByStateID}?StateID=${list.id}`;
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
      [key]: value[id]
    })
  }

  autocompleteIndexFormValue(event, i) {
    (<FormArray>this.employeeSkillsinformationForm.controls['employeeskillInfomation']).at(i).patchValue({
      skillName: event.join(',')
    });
  }

  onFileChange(file, form, key) {
    this[form].patchValue({
      [key]: file[0]
    })
    if (this.updateProfile) {
      this.myprofileService.updateEmployeeFiles(this.employeePersonalinformationForm.get('employeeId').value, key, file[0]);
    }
  }

  clearUploadedFile(i, form, key) {
    if(i === null) {
      this.image = null;
    }
    if(this.updateProfile) {
      // const obj = {
      //   yes: 'Delete',
      // }
      // this.commonService.openDialog(YesOrNoComponent, obj, null, (res) => {
      //   if(res) {
            const obj = { id: this.employeePersonalinformationForm.get('employeeId').value,  key: key }
            this.myprofileService.removeEmployeeFiles(obj, (res) => {
              if(res) {
                this[form].patchValue({
                  [key]: null
                })
              }
            })
      //     }
      // })
    } else {
      this[form].patchValue({
        [key]: null
      })
    }
  }

  onCertificateFileChange(file,i) {
    (<FormArray>this.employeeCertificationinformationForm.controls['employeecertificatInfomation']).at(i).patchValue({
      certification: file[0]
    });
  }

  saveEmployeeCertificationData(i) {
    const url = `${this.appService.saveEmployeeCertificationData}`;
    const obj = this.employeeCertificationinformationForm.controls['employeecertificatInfomation'].value[i];
    var formData: any = new FormData();
    if(obj.certificationId) {
      formData.append('certificationId',obj.certificationId);
    }
    formData.append('employeeId',obj.employeeId);
    formData.append('certificationName',obj.certificationName);
    formData.append('issuedDate',obj.issuedDate);
    formData.append('issuedBy',obj.issuedBy);
    formData.append('validUpTo',obj.validUpTo);
    formData.append('certificate',obj.certification);
    // formData.append('employeeId',this.employeePersonalinformationForm.get('employeeId').value);
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: formData
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
    }));
  }

  submitForm() {
    this.submitted = true;

    if(this.employeePersonalinformationForm.invalid) {
      return
    }

    // const countryName = this.countryList.find(item => item.id == this.employeePersonalinformationForm.get('country').value);
    // const stateName = this.stateList.find(item => item.id == this.employeePersonalinformationForm.get('state').value);
    // const cityName = this.cityList.find(item => item.id == this.employeePersonalinformationForm.get('city').value);
    let others = ''
    others = this.employeePersonalinformationForm.get('veterans').value ? 'veterans' : ''
    others = this.employeePersonalinformationForm.get('differentlyAbled').value ? (others ? others + ',' + 'differentlyAbled'  : 'differentlyAbled'  ): others
    var formData: any = new FormData();

    // personal deatils
    formData.append('userId',this.loginData.userId);
    formData.append('firstName', this.employeePersonalinformationForm.get('firstName').value);
    formData.append("lastName", this.employeePersonalinformationForm.get('lastName').value);
    formData.append("gender", this.employeePersonalinformationForm.get('gender').value);
    formData.append("email", this.employeePersonalinformationForm.get('email').value);
    formData.append("mobileNo", this.employeePersonalinformationForm.get('mobileNo').value);
    formData.append("countryCode", this.employeePersonalinformationForm.get('countryCode').value);
    formData.append("alternateMobileNo", this.employeePersonalinformationForm.get('alternateMobileNo').value);
    formData.append("alternateCountryCode", this.employeePersonalinformationForm.get('alternatecountryCode').value);
    formData.append("address", this.employeePersonalinformationForm.get('address').value);
    formData.append("address2",this.employeePersonalinformationForm.get('address2').value);
    formData.append("country", this.employeePersonalinformationForm.get('country').value);
    formData.append("state", this.employeePersonalinformationForm.get('state').value);
    formData.append("city", this.employeePersonalinformationForm.get('city').value);
    if(this.employeePersonalinformationForm.get('zipCode').value) {
      formData.append("zipCode", this.employeePersonalinformationForm.get('zipCode').value);
    }
    formData.append("nationality", this.employeePersonalinformationForm.get('nationality').value);
    formData.append("others", others);
    if(this.employeePersonalinformationForm.get('workAuthorizationId').value) {
    formData.append("workAuthorizationId", this.employeePersonalinformationForm.get('workAuthorizationId').value);
    }

    //job information
    formData.append("jobTitle", this.employeeJobinformationForm.get('jobTitle').value);
    if(this.employeeJobinformationForm.get('salaryId').value) {
    formData.append("salaryId", this.employeeJobinformationForm.get('salaryId').value);
    }
    if(this.employeeJobinformationForm.get('employeeTypeId').value) {
      formData.append("employeeTypeId", this.employeeJobinformationForm.get('employeeTypeId').value);
    }
    formData.append("preferredLocation", this.employeeJobinformationForm.get('preferredLocation').value);
    if(this.employeeJobinformationForm.get('noticePeriodId').value) {
    formData.append("noticePeriodId", this.employeeJobinformationForm.get('noticePeriodId').value);
    }
    formData.append("willingToRelocate", this.employeeJobinformationForm.get('willingToRelocate').value);
    formData.append("willingToTravel", this.employeeJobinformationForm.get('willingToTravel').value);
    formData.append("lookingForJob", this.employeeJobinformationForm.get('lookingForJob').value);

    // profile pic
    //formData.append("profile", this.companyLogoForm.get('companyLogo').value);

    // work information
    var postData = this.employeeworkexperienceForm.get('employeeInfomation').value;
     for (let i = 0; i < postData.length; i++) {
      var datalooped = postData[i];
      let newproduct = Object.assign({}, datalooped);
      formData.append("employeeWorkExperiences["+i+"].jobTittle",newproduct.jobTittle);
      formData.append("employeeWorkExperiences["+i+"].clientName",newproduct.clientName);
      if(newproduct.startDate) {
      formData.append("employeeWorkExperiences["+i+"].startDate",newproduct.startDate);
      }
      if(newproduct.endDate) {
      formData.append("employeeWorkExperiences["+i+"].endDate",newproduct.endDate);
      }
      formData.append("employeeWorkExperiences["+i+"].projectDescription",newproduct.projectDescription);
      formData.append("employeeWorkExperiences["+i+"].currentlyWorking",newproduct.currentlyWorking);
    }

     // Education information
     var postData = this.employeeEducationinformationForm.get('employeeeducationInfomation').value;
      for (let i = 0; i < postData.length; i++) {
       var datalooped = postData[i];
       let newproducteducation = Object.assign({}, datalooped);
       if(i !== 0){
        newproducteducation.higherEducation = false;
       }else{
        newproducteducation.higherEducation = true;
       }
       formData.append("employeeEducations["+i+"].specialization",newproducteducation.specialization);
       if(newproducteducation.qualificationId) {
        formData.append("employeeEducations["+i+"].qualificationId",newproducteducation.qualificationId);
       }
       formData.append("employeeEducations["+i+"].universityName",newproducteducation.universityName);
       formData.append("employeeEducations["+i+"].higherEducation",newproducteducation.higherEducation);
       formData.append("employeeEducations["+i+"].yearOfPassing",newproducteducation.yearOfPassing);
     }

     // skill information
    var postData = this.employeeSkillsinformationForm.get('employeeskillInfomation').value;
     for (let i = 0; i < postData.length; i++) {
      var datalooped = postData[i];
      let newproductskills = Object.assign({}, datalooped);
      const totalyear = newproductskills.totalexperienceyear+'.'+newproductskills.totalexperiencemonth;
      formData.append("employeeSkills["+i+"].skillName",newproductskills.skillName);
      formData.append("employeeSkills["+i+"].experience", +totalyear );
      formData.append("employeeSkills["+i+"].lastUsedYear",newproductskills.lastUsedYear);
    }

    // Certificate information
    var postCertificationData = this.employeeCertificationinformationForm.get('employeecertificatInfomation').value;
    if(postCertificationData.length) {
      for (let i = 0; i < postCertificationData.length; i++) {
        var datalooped = postCertificationData[i];
        let newproductcertificate = Object.assign({}, datalooped);
        formData.append("employeeCertifications["+i+"].certificationName",newproductcertificate.certificationName);
        if(newproductcertificate.issuedDate) {
          formData.append("employeeCertifications["+i+"].issuedDate",newproductcertificate.issuedDate);
        }
        formData.append("employeeCertifications["+i+"].issuedBy",newproductcertificate.issuedBy);
        formData.append("employeeCertifications["+i+"].validUpTo",newproductcertificate.validUpTo);
        formData.append("certification"+i,newproductcertificate.certification);
      }
    }

    formData.append("resume",this.resumeCoverForm.get('resume').value);
    formData.append("coverlater",this.resumeCoverForm.get('coverlater').value);
    formData.append("profile",this.profileForm.get('profile').value);

    const url = `${this.appService.saveEmployeeDetails}`;
    const apiObj = {
      url: url,
      methodType: HttpMethod.POST,
      requestObj: formData
    }
    this.commonService.commonApiCall(apiObj, ((res, statusFlag) => {
      this.spinnerService.hide();
      if (statusFlag) {
        this.submitted = false;
        if (res && res.hasOwnProperty('data')) {
          const data = JSON.parse(localStorage.getItem('loginData'));
          data.id = res.data.id;
          data.jobTitle = res.data.jobTitle;
          localStorage.setItem('loginData', JSON.stringify(data))
          this.route.navigateByUrl('/auth/employee/myprofile-overview');
        }
      }
    }));
  }

}
