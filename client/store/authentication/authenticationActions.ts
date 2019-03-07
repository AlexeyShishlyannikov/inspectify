import { Action } from "redux";

export type AuthenticationAction =
    | ILoginAction
    | IRegisterUserAction
    | IRegisterCompanyAction
    | IChangePasswordAction
    | IResetPasswordAction
    | IForgotPasswordAction
    | IConfirmEmailAction
    | IRefreshTokenAction
    | ILogoutAction
    | IChangeIsLoadingAction
    | ILoadedTokenAction
    | IReceivedErrorAction

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
export type CHANGE_IS_LOADING_ACTION = 'CHANGE_IS_LOADING_ACTION';
export type REFRESH_TOKEN_ACTION = 'REFRESH_TOKEN_ACTION';

export interface ILoginAction extends Action {
    type: LOGIN_ACTION;
    email: string;
    password: string;
}

export interface IRegisterUserAction extends Action {
    type: REGISTER_USER_ACTION;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    invitationId: string;
}

export interface IRegisterCompanyAction extends Action {
    type: REGISTER_COMPANY_ACTION;
    companyName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IChangePasswordAction extends Action {
    type: CHANGE_PASSWORD_ACTION;
    password: string;
    oldPassword: string;
}

export interface IResetPasswordAction extends Action {
    type: RESET_PASSWORD_ACTION;
    password: string;
    confirmPassword: string;
}

export interface IForgotPasswordAction extends Action {
    type: FORGOT_PASSWORD_ACTION;
    email: string;
}

export interface IConfirmEmailAction extends Action {
    type: CONFIRM_EMAIL_ACTION;
    token: string;
    email: string;
}

export interface IRefreshTokenAction extends Action {
    type: REFRESH_TOKEN_ACTION;
}

export interface ILogoutAction extends Action {
    type: LOGOUT_ACTION;
}

export interface IChangeIsLoadingAction extends Action {
    type: CHANGE_IS_LOADING_ACTION;
    status: boolean;
}

export interface ILoadedTokenAction extends Action {
    type: LOADED_TOKEN_ACTION;
    token: {
        token: string;
        refreshToken: string;
    };
}

export interface IReceivedErrorAction extends Action {
    type: RECEIVED_ERROR_ACTION;
    message: string;
}