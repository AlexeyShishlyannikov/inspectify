export interface ILogin {
    userName: string;
    password: string;
}

export interface IRegister extends ILogin {
    confirmPassword: string;
}

export interface IRegisterUser extends IRegister {
    firstName: string;
    lastName: string;
}

export interface IRegisterCompany extends IRegister {
    companyName: string;
}

export interface IChangePassword extends IRegister {
    oldPassword: string;
}

export interface IResetPassword {
    password: string;
    confirmPassword: string;
}

export interface IForgotPassword {
    userName: string;
}

export interface IExternalLogin {
    provider: string;
    token: string;
}

export interface IConfirmEmail {
    token: string;
    email: string;
}
