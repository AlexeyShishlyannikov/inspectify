import {
    ILogin,
    IRegisterUser,
    IForgotPassword,
    IChangePassword,
    IResetPassword,
    IExternalLogin,
    IRegisterCompany,
    IConfirmEmail
} from '../models/AccontModels';

export namespace AuthAPI {
    export const login = async (
        login: ILogin,
        isCompany: boolean
    ): Promise<string> => {
        const response = await fetch(
            window.location.origin + '/api/account/login/' + isCompany
                ? 'company'
                : 'user',
            {
                body: JSON.stringify(login),
                method: 'POST'
            }
        );
        return response.json();
    };

    export const registerUser = async (
        register: IRegisterUser
    ): Promise<string> => {
        const response = await fetch(
            window.location.origin + '/api/account/register/user',
            {
                body: JSON.stringify(register),
                method: 'POST'
            }
        );
        return response.json();
    };

    export const registerCompany = async (
        register: IRegisterCompany
    ): Promise<string> => {
        const response = await fetch(
            window.location.origin + '/api/account/register/company',
            {
                body: JSON.stringify(register),
                method: 'POST'
            }
        );
        return response.json();
    };

    export const forgotPassword = async (
        forgotPassword: IForgotPassword
    ): Promise<any> => {
        const response = await fetch(
            window.location.origin + '/api/account/login/user',
            {
                body: JSON.stringify(forgotPassword),
                method: 'POST'
            }
        );
        return response.json();
    };

    export const changePassword = async (
        changePassword: IChangePassword
    ): Promise<any> => {
        const response = await fetch(
            window.location.origin + '/api/account/login/user',
            {
                body: JSON.stringify(changePassword),
                method: 'POST'
            }
        );
        return response.json();
    };

    export const resetPassword = async (
        resetPassword: IResetPassword
    ): Promise<any> => {
        const response = await fetch(
            window.location.origin + '/api/account/login/user',
            {
                body: JSON.stringify(resetPassword),
                method: 'POST'
            }
        );
        return response.json();
    };

    export const externalLogin = async (
        externalLogin: IExternalLogin
    ): Promise<any> => {
        const response = await fetch(
            window.location.origin +
                `/api/account/login/user?provider=${
                    externalLogin.provider
                }&token=${externalLogin.token}`,
            {
                method: 'GET'
            }
        );
        return response.json();
    };

    export const confirmEmailAddress = async (
        confirmEmail: IConfirmEmail
    ): Promise<any> => {
        const response = await fetch(
            window.location.origin +
                `/api/account/confirm?token=${confirmEmail.token}&email=${
                    confirmEmail.email
                }`,
            {
                method: 'GET'
            }
        );
        return response.json();
    };
}
