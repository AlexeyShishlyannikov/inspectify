import { AppThunkAction } from '..';
import { IForm } from '../../models/Form';
import {
    IDeletedFormAction,
    ILoadedFormsAction,
    IUpdatedFormAction,
    IUpdateFormLoadingAction,
    ILoadedFormAction,
    IAddedFormAction
} from './FormActions';
import { ActionsUtil } from '../actionsUtil';

export namespace FormThunks {
    export const searchForms = (searchTerm: string): AppThunkAction<ILoadedFormsAction | IUpdateFormLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_FORMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/form?searchTerm=' + searchTerm,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_FORMS_ACTION", forms: result }));
    };

    export const getForm = (id: string): AppThunkAction<ILoadedFormAction | IUpdateFormLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_FORMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/form/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_FORM_ACTION", form: result }));
    };

    export const createForm = (form: IForm): AppThunkAction<IAddedFormAction | IUpdateFormLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_FORMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/form',
            {
                body: JSON.stringify(form),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "ADDED_FORM_ACTION", form: result }));
    };

    export const updateForm = (form: IForm): AppThunkAction<IUpdatedFormAction | IUpdateFormLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_FORMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/form',
            {
                body: JSON.stringify(form),
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_FORM_ACTION", form: result }));
    };

    export const deleteForm = (id: string): AppThunkAction<IDeletedFormAction | IUpdateFormLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_FORMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/form/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                },
            }
        ).then(res => res.text())
            .then(result => dispatch({ type: "DELETED_FORM_ACTION", id: result }));
    };
}
