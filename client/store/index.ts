import { load } from 'redux-localstorage-simple';

import { authReducer } from './authentication/authenticationReducers';
import { AuthenticationState } from './authentication/authenticationState';
import { companyReducer } from './company/companyReducers';
import { CompanyState } from './company/companyState';
import { invitationsReducer } from './invitations/invitationsReducers';
import { InvitaionsState } from './invitations/invitationsState';
import { IPeopleState, PeopleState } from './people/peopleState';
import { peopleReducer } from './people/peopleReducers';

// The top-level state object
export interface ApplicationState {
    authentication: AuthenticationState;
    company: CompanyState;
    invitations: InvitaionsState;
    people: IPeopleState;
    // vehicle:;
    // report:;
    // reportForm:;
    // team:;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    authentication: authReducer,
    company: companyReducer,
    invitations: invitationsReducer,
    people: peopleReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (
        dispatch: (action: TAction) => void,
        getState: () => ApplicationState
    ): void;
}

export function getInitialState(): ApplicationState {
    const storedState = load();
    if (storedState) {
        return storedState as ApplicationState;
    }
    return {
        authentication: AuthenticationState.initialState(),
        company: CompanyState.initialState(),
        invitations: InvitaionsState.initialState(),
        people: PeopleState.initialState()
    };
}