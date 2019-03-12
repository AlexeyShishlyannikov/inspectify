import { AppThunkAction } from '..';
import { ITemplate, IProperty } from '../../models/inventory';
import { ActionsUtil } from '../actionsUtil';
import {
    IAddedTemplateAction,
    IDeletedTemplateAction,
    ILoadedTemplateAction,
    ILoadedTemplatesAction,
    IUpdatedTemplateAction,
    IUpdateTemplateLoadingAction,
    IUpdatePropertiesLoadingAction,
    IAddedPropertyAction,
    IUpdatedPropertyAction,
    IDeletedPropertyAction,
    ILoadedPropertiesAction,
} from './templateActions';

export namespace TemplatesThunks {
    export const searchTemplates = (searchTerm: string): AppThunkAction<ILoadedTemplatesAction | IUpdateTemplateLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEMPLATES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/inventory/templates?searchTerm=' + searchTerm,
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
            window.location.origin + '/api/inventory/templates/' + id,
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
            window.location.origin + '/api/inventory/templates',
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
            window.location.origin + '/api/inventory/templates',
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
            window.location.origin + '/api/inventory/templates/' + id,
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

    export const getProperties = (id: string): AppThunkAction<ILoadedPropertiesAction | IUpdatePropertiesLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PROPERTIES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        const selectedTemplate = getState().templates.selectedTemplate;
        const templateId = selectedTemplate ? selectedTemplate.id : undefined;
        fetch(
            window.location.origin + '/api/inventory/templates/'+ templateId + 'properties/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_PROPERTIES_ACTION", properties: result }));
    };

    export const createProperty = (Property: IProperty): AppThunkAction<IAddedPropertyAction | IUpdatePropertiesLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PROPERTIES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        const selectedTemplate = getState().templates.selectedTemplate;
        const templateId = selectedTemplate ? selectedTemplate.id : undefined;
        fetch(
            window.location.origin + '/api/inventory/templates/'+ templateId + 'properties',
            {
                body: JSON.stringify(Property),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "ADDED_PROPERTY_ACTION", property: result }));
    };

    export const updateProperty = (Property: IProperty): AppThunkAction<IUpdatedPropertyAction | IUpdatePropertiesLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PROPERTIES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        const selectedTemplate = getState().templates.selectedTemplate;
        const templateId = selectedTemplate ? selectedTemplate.id : undefined;
        fetch(
            window.location.origin + '/api/inventory/templates/'+ templateId + 'properties',
            {
                body: JSON.stringify(Property),
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_PROPERTY_ACTION", property: result }));
    };

    export const deleteProperty = (id: string): AppThunkAction<IDeletedPropertyAction | IUpdatePropertiesLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PROPERTIES_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        const selectedTemplate = getState().templates.selectedTemplate;
        const templateId = selectedTemplate ? selectedTemplate.id : undefined;
        fetch(
            window.location.origin + '/api/inventory/templates/'+ templateId + 'properties/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                },
            }
        ).then(res => res.text())
            .then(result => dispatch({ type: "DELETED_PROPERTY_ACTION", id: +result }));
    };
}
