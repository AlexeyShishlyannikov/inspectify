import { Action } from 'redux';

import { IForm } from '../../models/Form';

export type FormAction =
    | ILoadedFormAction
    | ILoadedFormsAction
    | ISelectFormAction
    | IAddedFormAction
    | IUpdatedFormAction
    | IDeletedFormAction
    | IUpdateFormLoadingAction
// | ISwitchEditFormModeAction

export type SELECT_FORM_ACTION = "SELECT_FORM_ACTION";
export type ADDED_FORM_ACTION = "ADDED_FORM_ACTION";
export type LOADED_FORM_ACTION = "LOADED_FORM_ACTION";
export type LOADED_FORMS_ACTION = "LOADED_FORMS_ACTION";
export type UPDATED_FORM_ACTION = "UPDATED_FORM_ACTION";
export type DELETED_FORM_ACTION = "DELETED_FORM_ACTION";
export type UPDATE_FORMS_LOADING_ACTION = "UPDATE_FORMS_LOADING_ACTION";
// export type SWITCH_EDIT_FORM_MODE_ACTION = "SWITCH_EDIT_FORM_MODE_ACTION";

export interface ILoadedFormAction extends Action {
    type: LOADED_FORM_ACTION;
    form: IForm;
}

export interface ILoadedFormsAction extends Action {
    type: LOADED_FORMS_ACTION;
    forms: IForm[];
}

export interface ISelectFormAction extends Action {
    type: SELECT_FORM_ACTION;
    selectedForm: IForm;
}

export interface IAddedFormAction extends Action {
    type: ADDED_FORM_ACTION;
    form: IForm;
}

export interface IUpdatedFormAction extends Action {
    type: UPDATED_FORM_ACTION;
    form: IForm;
}

export interface IDeletedFormAction extends Action {
    type: DELETED_FORM_ACTION;
    id: string;
}

export interface IUpdateFormLoadingAction extends Action {
    type: UPDATE_FORMS_LOADING_ACTION;
    status: boolean;
}

// export interface ISwitchEditFormModeAction extends Action {
//     type: SWITCH_EDIT_FORM_MODE_ACTION;
//     status: boolean;
// }
