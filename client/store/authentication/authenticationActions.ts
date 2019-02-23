export type LOGIN_ACTION = 'LOGIN_ACTION';
export type REGISTER_USER_ACTION = 'REGISTER_USER_ACTION';
export type REGISTER_COMPANY_ACTION = 'REGISTER_COMPANY_ACTION';
export type CHANGE_PASSWORD_ACTION = 'CHANGE_PASSWORD_ACTION';
export type RESET_PASSWORD_ACTION = 'RESET_PASSWORD_ACTION';
export type FORGOT_PASSWORD_ACTION = 'FORGOT_PASSWORD_ACTION';
export type CONFIRM_EMAIL_ACTION = 'CONFIRM_EMAIL_ACTION';
export type LOADED_TOKEN_ACTION = 'LOADED_USER_ACTION';
export type RECEIVED_ERROR_ACTION = 'RECEIVED_ERROR_ACTION';
export type LOGOUT_ACTION = 'LOGOUT_ACTION';
export type CHANGE_IS_AUTHENTICATING_ACTION = 'CHANGE_IS_AUTHENTICATING_ACTION';
export type REFRESH_TOKEN_ACTION = 'REFRESH_TOKEN_ACTION';

export interface ILoginAction {
    type: LOGIN_ACTION;
    email: string;
    password: string;
}

export interface IRegisterActionPrototype {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterUserAction extends IRegisterActionPrototype {
    type: REGISTER_USER_ACTION;
    firstName: string;
    lastName: string;
}

export interface IRegisterCompanyAction extends IRegisterActionPrototype {
    type: REGISTER_COMPANY_ACTION;
    companyName: string;
}

export interface IChangePasswordAction extends IRegisterActionPrototype {
    type: CHANGE_PASSWORD_ACTION;
    oldPassword: string;
}

export interface IResetPasswordAction {
    type: RESET_PASSWORD_ACTION;
    password: string;
    confirmPassword: string;
}

export interface IForgotPasswordAction {
    type: FORGOT_PASSWORD_ACTION;
    email: string;
}

export interface IConfirmEmailAction {
    type: CONFIRM_EMAIL_ACTION;
    token: string;
    email: string;
}

export interface IRefreshTokenAction {
    type: REFRESH_TOKEN_ACTION;
}

export interface ILogoutAction {
    type: LOGOUT_ACTION;
}

export interface ChangeIsAuthenticatingStatus {
    type: CHANGE_IS_AUTHENTICATING_ACTION;
}

export interface LoadedTokenAction {
    type: LOADED_TOKEN_ACTION;
    token: string;
}

export interface ReceivedErrorAction {
    type: RECEIVED_ERROR_ACTION;
    message: string;
}