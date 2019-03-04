import { Action, Reducer } from 'redux';

import { ActionsUtil } from '../actionsUtil';
import { PeopleAction } from './peopleActions';
import { PeopleState } from './peopleState';

export const peopleReducer: Reducer<PeopleState> = (
    state: PeopleState = PeopleState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as PeopleAction;
    switch (action.type) {
        case 'LOADED_PEOPLE_ACTION':
            return new PeopleState({
                selectedPerson: state.selectedPerson && action.people.find(p => !!state.selectedPerson && p.id === state.selectedPerson.id)
                    ? state.selectedPerson
                    : undefined,
                people: action.people,
                isLoading: false,
                errorMessage: undefined
            });
        case 'SELECT_PERSON_ACTION':
            return new PeopleState({
                selectedPerson: action.selectedPerson,
                people: state.people,
                isLoading: false,
                errorMessage: undefined
            });
        case 'LOADED_PERSON_ACTION':
            return new PeopleState({
                selectedPerson: action.person,
                people: state.people,
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATED_PERSON_ACTION':
            return new PeopleState({
                selectedPerson: ActionsUtil.getSelectedValueUtil(state.selectedPerson, action.person),
                people: state.people.map(p => p.id === action.person.id ? action.person : p),
                isLoading: false,
                errorMessage: undefined
            });
        case 'DELETED_PERSON_ACTION':
            return new PeopleState({
                selectedPerson: state.selectedPerson && state.selectedPerson.id === action.id ? undefined : state.selectedPerson,
                people: state.people.filter(inv => inv.id !== action.id),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATE_PEOPLE_LOADING_ACTION':
            return new PeopleState({
                selectedPerson: state.selectedPerson,
                people: state.people,
                isLoading: action.status,
                errorMessage: undefined
            });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
