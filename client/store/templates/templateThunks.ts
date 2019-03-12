import { AppThunkAction } from '..';
import { ITemplate } from '../../models/inventory';
import { ActionsUtil } from '../actionsUtil';
import {
    IAddedTemplateAction,
    IDeletedTemplateAction,
    ILoadedTemplateAction,
    ILoadedTemplatesAction,
    IUpdatedTemplateAction,
    IUpdateTemplateLoadingAction,
} from './templateActions';

export namespace TemplatesThunks {
    export const searchTemplates = (searchTerm: string): AppThunkAction<ILoadedTemplatesAction | IUpdateTemplateLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEMPLATES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/template?searchTerm=' + searchTerm,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_TEMPLATES_ACTION", templates: result }));
    };

    export const getTemplate = (id: string): AppThunkAction<ILoadedTemplateAction | IUpdateTemplateLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEMPLATES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/template/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_TEMPLATE_ACTION", template: result }));
    };

    export const createTemplate = (template: ITemplate): AppThunkAction<IAddedTemplateAction | IUpdateTemplateLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEMPLATES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/template',
            {
                body: JSON.stringify(template),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "ADDED_TEMPLATE_ACTION", template: result }));
    };

    export const updateTemplate = (template: ITemplate): AppThunkAction<IUpdatedTemplateAction | IUpdateTemplateLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEMPLATES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/template',
            {
                body: JSON.stringify(template),
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_TEMPLATE_ACTION", template: result }));
    };

    export const deleteTemplate = (id: string): AppThunkAction<IDeletedTemplateAction | IUpdateTemplateLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEMPLATES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/template/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                },
            }
        ).then(res => res.text())
            .then(result => dispatch({ type: "DELETED_TEMPLATE_ACTION", id: result }));
    };
}
