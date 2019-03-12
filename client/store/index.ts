import { load } from 'redux-localstorage-simple';

import { authReducer } from './authentication/authenticationReducers';
import { AuthenticationState } from './authentication/authenticationState';
import { companyReducer } from './company/companyReducers';
import { CompanyState } from './company/companyState';
import { invitationsReducer } from './invitations/invitationsReducers';
import { InvitaionsState } from './invitations/invitationsState';
import { IPeopleState, PeopleState } from './people/peopleState';
import { peopleReducer } from './people/peopleReducers';
import { ITeamsState, TeamsState } from './team/teamState';
import { teamsReducer } from './team/teamReducers';
import { routerReducer, RouterState } from 'react-router-redux';
import { IFormsState, FormsState } from './form/FormState';
import { formsReducer } from './form/formReducers';
import { IItemsState, ItemsState } from './items/itemsState';
import { itemsReducer } from './items/itemsReducers';
import { templatesReducer } from './templates/templateReducers';
import { ITemplatesState, TemplatesState } from './templates/templateState';

// The top-level state object
export interface ApplicationState {
    authentication: AuthenticationState;
    company: CompanyState;
    invitations: InvitaionsState;
    people: IPeopleState;
    teams: ITeamsState;
    routing: RouterState;
    forms: IFormsState;
    items: IItemsState;
    templates: ITemplatesState;
    // report:;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    authentication: authReducer,
    company: companyReducer,
    invitations: invitationsReducer,
    people: peopleReducer,
    teams: teamsReducer,
    routing: routerReducer,
    forms: formsReducer,
    items: itemsReducer,
    templates: templatesReducer
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
        people: PeopleState.initialState(),
        teams: TeamsState.initialState(),
        forms: FormsState.initialState(),
        routing: routingInitialState(),
        templates: TemplatesState.initialState(),
        items: ItemsState.initialState()
    };
}

export const routingInitialState = () => ({
    location: {
        hash: '',
        key: '',
        pathname: '',
        search: '',
        state: undefined
    }
});