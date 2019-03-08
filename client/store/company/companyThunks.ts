import { ICompany } from '../../models/company';

import { ApplicationState, AppThunkAction } from '..';
import { ILoadedCompanyAction, IUpdateCompanyLoadingAction, IUpdatedCompanyAction } from './companyActions';
import { ActionsUtil } from '../actionsUtil';

export namespace CompanyThunks {
    export const getCompany = (): AppThunkAction<ILoadedCompanyAction | IUpdateCompanyLoadingAction> => async (dispatch, getState: () => ApplicationState) => {
        dispatch({
            type: "UPDATE_COMPANY_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/companies',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_COMPANY_ACTION", company: result }));
    };

    export const updateCompany = (company: ICompany): AppThunkAction<IUpdatedCompanyAction | IUpdateCompanyLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_COMPANY_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/companies/update',
            {
                body: JSON.stringify(company),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_COMPANY_ACTION", company: result }));
    };
}
