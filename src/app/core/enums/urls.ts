import { environment } from '../../../environments/environment';

let url = `${environment.baseUrl}api/`;

export const LOGIN = {
    employeeLogin: `${url}Login/Employee`,
    employerlogin: `${url}Login/Employer`
}
export const USER = {
    USER_DETAILS: `${url}Account/users/me`,
    changePassword: `${url}Account/public/changepassword`,
    resetPassword: `${url}account/public/resetpassword`,
    recoverPassword: `${url}Account/public/recoverpassword`




}

export const REGISTRATION = {

    resendOTP:  `${url}registration/ResendOTP`,
    employerverificationcode: `${url}registration/EmployerVerifyEmail`,
    verificationcode: `${url}registration/EmployeeVerifyEmail`,
    employerregistrationfldata: `${url}registration/Employer`,
    employeeregistrationfldata: `${url}registration/Employee`,
    resetemployespassword: `${url}registration/ResetPassword`,
    employespasswordreset: `${url}registration/ChangePassword`,
    passwordgosetemployer: `${url}registration/VerifyOTP`,
    forgetpasswordemployer: `${url}registration/EmployerForgotPassword`,
    forgetpassword: `${url}registration/EmployeeForgotPassword`

}