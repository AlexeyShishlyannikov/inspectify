import { Action } from 'redux';

import { ITemplate, IProperty } from '../../models/inventory';

export type TemplateAction =
    | ILoadedTemplateAction
    | ILoadedTemplatesAction
    | ISelectTemplateAction
    | IAddedTemplateAction
    | IUpdatedTemplateAction
    | IDeletedTemplateAction
    | IUpdateTemplateLoadingAction
    | IUpdatePropertiesLoadingAction
| ILoadedPropertiesAction
| IAddedPropertyAction
| IUpdatedPropertyAction
| IDeletedPropertyAction
// | ISwitchEditTemplateModeAction

export type SELECT_TEMPLATE_ACTION = "SELECT_TEMPLATE_ACTION";
export type ADDED_TEMPLATE_ACTION = "ADDED_TEMPLATE_ACTION";
export type LOADED_TEMPLATE_ACTION = "LOADED_TEMPLATE_ACTION";
export type LOADED_TEMPLATES_ACTION = "LOADED_TEMPLATES_ACTION";
export type UPDATED_TEMPLATE_ACTION = "UPDATED_TEMPLATE_ACTION";
export type DELETED_TEMPLATE_ACTION = "DELETED_TEMPLATE_ACTION";
export type UPDATE_TEMPLATES_LOADING_ACTION = "UPDATE_TEMPLATES_LOADING_ACTION";
export type UPDATE_PROPERTIES_LOADING_ACTION = "UPDATE_PROPERTIES_LOADING_ACTION";
export type ADDED_PROPERTY_ACTION = "ADDED_PROPERTY_ACTION";
export type LOADED_PROPERTIES_ACTION = "LOADED_PROPERTIES_ACTION";
export type UPDATED_PROPERTY_ACTION = "UPDATED_PROPERTY_ACTION";
export type DELETED_PROPERTY_ACTION = "DELETED_PROPERTY_ACTION";
// export type SWITCH_EDIT_TEMPLATE_MODE_ACTION = "SWITCH_EDIT_TEMPLATE_MODE_ACTION";

export interface ILoadedTemplateAction extends Action {
    type: LOADED_TEMPLATE_ACTION;
    template: ITemplate;
}

export interface ILoadedTemplatesAction extends Action {
    type: LOADED_TEMPLATES_ACTION;
    templates: ITemplate[];
}

export interface ISelectTemplateAction extends Action {
    type: SELECT_TEMPLATE_ACTION;
    selectedTemplate: ITemplate;
}

export interface IAddedTemplateAction extends Action {
    type: ADDED_TEMPLATE_ACTION;
    template: ITemplate;
}

export interface IUpdatedTemplateAction extends Action {
    type: UPDATED_TEMPLATE_ACTION;
    template: ITemplate;
}

export interface IDeletedTemplateAction extends Action {
    type: DELETED_TEMPLATE_ACTION;
    id: string;
}

export interface IUpdateTemplateLoadingAction extends Action {
    type: UPDATE_TEMPLATES_LOADING_ACTION;
    status: boolean;
}

export interface IUpdatePropertiesLoadingAction extends Action {
    type: UPDATE_PROPERTIES_LOADING_ACTION;
    status: boolean;
}

export interface ILoadedPropertiesAction {
    type: LOADED_PROPERTIES_ACTION,
    properties: IProperty[];
}

export interface IAddedPropertyAction {
    type: ADDED_PROPERTY_ACTION,
    property: IProperty;
}

export interface IUpdatedPropertyAction {
    type: UPDATED_PROPERTY_ACTION,
    property: IProperty;
}

export interface IDeletedPropertyAction {
    type: DELETED_PROPERTY_ACTION,
    id: number;
}

// export interface ISwitchEditTemplateModeAction extends Action {
//     type: SWITCH_EDIT_TEMPLATE_MODE_ACTION;
//     status: boolean;
// }
