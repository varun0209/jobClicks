import { Validators } from "@angular/forms";

export const validateForm = {
    FirstName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')])], 
    LastName: ['',Validators.compose([Validators.required,Validators.maxLength(50),Validators.pattern('[a-zA-Z][a-zA-Z ]+')])],
    MobileNo: ['',Validators.compose([Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
    Email:  ['',Validators.compose([Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])],
    Password: ['',Validators.compose([Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$")])],
    required: ['',Validators.required],
};