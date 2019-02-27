import { Action, Reducer } from 'redux';

import { CompanyActions } from './companyActions';
import { CompanyState } from './companyState';

export const companyReducer: Reducer<CompanyState> = (
    state: CompanyState = CompanyState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as CompanyActions;
    switch (action.type) {
        case 'UPDATE_COMPANY_LOADING_ACTION':
            return new CompanyState({
                isLoading: action.status,
                company: state.company
            });
        case 'LOADED_COMPANY_ACTION':
            return new CompanyState({
                isLoading: false,
                company: action.company
            });
        case 'UPDATED_COMPANY_ACTION':
            return new CompanyState({
                isLoading: false,
                company: action.company
            });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
