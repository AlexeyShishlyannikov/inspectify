import { Action } from "redux";
import { ICompany } from "client/models/company";

export type CompanyActions = ILoadedCompanyAction | IUpdatedCompanyAction | IUpdateCompanyLoadingAction;

export type LOADED_COMPANY_ACTION = "LOADED_COMPANY_ACTION";
export type UPDATED_COMPANY_ACTION = "UPDATED_COMPANY_ACTION";
export type UPDATE_COMPANY_LOADING_ACTION = "UPDATE_COMPANY_LOADING_ACTION";

export interface ILoadedCompanyAction extends Action {
    type: LOADED_COMPANY_ACTION,
    company: ICompany;
}

export interface IUpdatedCompanyAction extends Action {
    type: UPDATED_COMPANY_ACTION,
    company: ICompany
}

export interface IUpdateCompanyLoadingAction extends Action {
    type: UPDATE_COMPANY_LOADING_ACTION,
    status: boolean
}