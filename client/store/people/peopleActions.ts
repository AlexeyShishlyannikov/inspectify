import { Action } from 'redux';

import { IPerson } from '../../models/person';

export type PeopleAction = IUpdatePeopleLoadingAction
    | IUpdatedPersonAction
    | IDeletedPersonAction
    | ILoadedPeopleAction
    | ISelectPersonAction;

export type LOADED_PEOPLE_ACTION = "LOADED_PEOPLE_ACTION";
export type SELECT_PERSON_ACTION = "SELECT_PERSON_ACTION";
export type UPDATED_PERSON_ACTION = "UPDATED_PERSON_ACTION";
export type DELETED_PERSON_ACTION = "DELETED_PERSON_ACTION";
export type UPDATE_PEOPLE_LOADING_ACTION = "UPDATE_PEOPLE_LOADING_ACTION";

export interface ILoadedPeopleAction extends Action {
    type: LOADED_PEOPLE_ACTION;
    people: IPerson[];
}

export interface IUpdatedPersonAction extends Action {
    type: UPDATED_PERSON_ACTION;
    person: IPerson;
}

export interface IDeletedPersonAction extends Action {
    type: DELETED_PERSON_ACTION;
    id: string;
}

export interface IUpdatePeopleLoadingAction extends Action {
    type: UPDATE_PEOPLE_LOADING_ACTION;
    status: boolean;
}

export interface ISelectPersonAction extends Action {
    type: SELECT_PERSON_ACTION;
    selectedPerson: IPerson;
}