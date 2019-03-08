import { AppThunkAction } from '..';
import { IPerson } from '../../models/person';
import {
    IDeletedPersonAction,
    ILoadedPeopleAction,
    IUpdatedPersonAction,
    IUpdatePeopleLoadingAction,
    ILoadedPersonAction,
} from './peopleActions';
import { ActionsUtil } from '../actionsUtil';

export namespace PeopleThunks {
    export const getPeople = (searchTerm: string): AppThunkAction<ILoadedPeopleAction | IUpdatePeopleLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PEOPLE_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/users/company?searchTerm=' + searchTerm,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_PEOPLE_ACTION", people: result }));
    };

    export const getPeopleForTeam = (teamId: string, searchTerm: string): AppThunkAction<ILoadedPeopleAction | IUpdatePeopleLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PEOPLE_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/users/team/' + teamId + '?searchTerm=' + searchTerm,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_PEOPLE_ACTION", people: result }));
    };

    export const getPerson = (id: string): AppThunkAction<ILoadedPersonAction | IUpdatePeopleLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PEOPLE_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/users?id=' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_PERSON_ACTION", person: result }));
    };

    export const updatePerson = (person: IPerson): AppThunkAction<IUpdatedPersonAction | IUpdatePeopleLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PEOPLE_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/users/update',
            {
                body: JSON.stringify(person),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_PERSON_ACTION", person: result }));
    };

    export const deletePerson = (id: string): AppThunkAction<IDeletedPersonAction | IUpdatePeopleLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_PEOPLE_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/users/delete?id=' + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                },
            }
        ).then(res => res.text())
            .then(result => dispatch({ type: "DELETED_PERSON_ACTION", id: result }));
    };
}
