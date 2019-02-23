import {
    ILoginAction,
    IRegisterUserAction,
    IForgotPasswordAction,
    IChangePasswordAction,
    IResetPasswordAction,
    IRegisterCompanyAction,
    IConfirmEmailAction,
    ILoadedTokenAction,
    IReceivedErrorAction,
    IChangeIsLoadingAction
} from './authenticationActions';
import { AppThunkAction, ApplicationState } from '..';

export namespace AuthThunks {
    export const login = (
        login: ILoginAction
    ): AppThunkAction<ILoadedTokenAction | IReceivedErrorAction | IChangeIsLoadingAction> => (dispatch, getState: () => ApplicationState) => {
        dispatch({
            type: "CHANGE_IS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/account/login',
            {
                body: JSON.stringify(login),
                method: 'POST'
            }
        ).then(res => {
            const token = JSON.stringify(res.body);
            dispatch({
                type: "LOADED_USER_ACTION",
                token: token
            });
        }).catch(err => dispatch({
            type: "RECEIVED_ERROR_ACTION",
            message: err.message
        }));
    };

    export const registerUser = (
        register: IRegisterUserAction
    ): AppThunkAction<ILoadedTokenAction | IReceivedErrorAction | IChangeIsLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "CHANGE_IS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/account/register/user',
            {
                body: JSON.stringify(register),
                method: 'POST'
            }
        ).then(res => {
            const token = JSON.stringify(res.body);
            dispatch({
                type: "LOADED_USER_ACTION",
                token: token
            });
        }).catch(err => dispatch({
            type: "RECEIVED_ERROR_ACTION",
            message: err.message
        }));
    };

    export const registerCompany = (
        register: IRegisterCompanyAction
    ): AppThunkAction<ILoadedTokenAction | IReceivedErrorAction | IChangeIsLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "CHANGE_IS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/account/register/company',
            {
                body: JSON.stringify(register),
                method: 'POST'
            }
        ).then(res => {
            const token = JSON.stringify(res.body);
            dispatch({
                type: "LOADED_USER_ACTION",
                token: token
            });
        }).catch(err => dispatch({
            type: "RECEIVED_ERROR_ACTION",
            message: err.message
        }));
    };

    export const forgotPassword = (
        forgotPassword: IForgotPasswordAction
    ): AppThunkAction<IChangeIsLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "CHANGE_IS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/account/forgot',
            {
                body: JSON.stringify(forgotPassword),
                method: 'POST'
            }
        ).then(() => {
            dispatch({
                type: "CHANGE_IS_LOADING_ACTION",
                status: false
            });
        });
    };

    export const changePassword = (
        changePassword: IChangePasswordAction
    ): AppThunkAction<IChangeIsLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "CHANGE_IS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/account/change',
            {
                body: JSON.stringify(changePassword),
                method: 'POST'
            }
        ).then(() => {
            dispatch({
                type: "CHANGE_IS_LOADING_ACTION",
                status: false
            });
        });
    };

    export const resetPassword = (
        resetPassword: IResetPasswordAction
    ): AppThunkAction<IChangeIsLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "CHANGE_IS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/account/reset',
            {
                body: JSON.stringify(resetPassword),
                method: 'POST'
            }
        ).then(() => {
            dispatch({
                type: "CHANGE_IS_LOADING_ACTION",
                status: true
            });
        });
    };

    export const confirmEmailAddress = (
        confirmEmail: IConfirmEmailAction
    ): AppThunkAction<IChangeIsLoadingAction | ILoadedTokenAction | IReceivedErrorAction> => (dispatch, getState) => {
        dispatch({
            type: "CHANGE_IS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin +
            `/api/account/confirm?token=${confirmEmail.token}&email=${
            confirmEmail.email
            }`,
            {
                method: 'GET'
            }
        ).then(res => {
            const token = JSON.stringify(res.body);
            dispatch({
                type: "LOADED_USER_ACTION",
                token: token
            });
        }).catch(err => dispatch({
            type: "RECEIVED_ERROR_ACTION",
            message: err.message
        }));
    };
}
