export interface ILogin {
    userName: string;
    password: string;
}

export interface IRegister extends ILogin {
    confirmPassword: string;
}

export interface IResetPassword {
    password: string;
    confirmPassword: string;
}

export interface IForgotPassword {
    userName: string;
}
