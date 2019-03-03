import { AppThunkAction } from '..';
import { ITeam } from '../../models/Team';
import {
    IDeletedTeamAction,
    ILoadedTeamsAction,
    IUpdatedTeamAction,
    IUpdateTeamLoadingAction,
    ILoadedTeamAction,
    IAddedTeamAction
} from './TeamActions';

export namespace TeamThunks {
    export const getTeams = (searchTerm: string): AppThunkAction<ILoadedTeamsAction | IUpdateTeamLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEAMS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/team/getTeams?searchTerm=' + searchTerm,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_TEAMS_ACTION", teams: result }));
    };

    export const getTeam = (id: string): AppThunkAction<ILoadedTeamAction | IUpdateTeamLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEAMS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/team/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_TEAM_ACTION", team: result }));
    };

    export const createTeam = (team: ITeam): AppThunkAction<IAddedTeamAction | IUpdateTeamLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEAMS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/team/add',
            {
                body: JSON.stringify(team),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "ADDED_TEAM_ACTION", team: result }));
    };

    export const updateTeam = (team: ITeam): AppThunkAction<IUpdatedTeamAction | IUpdateTeamLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEAMS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/team/update',
            {
                body: JSON.stringify(team),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_TEAM_ACTION", team: result }));
    };

    export const deleteTeam = (id: string): AppThunkAction<IDeletedTeamAction | IUpdateTeamLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "UPDATE_TEAMS_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/team/delete/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
        ).then(res => res.text())
            .then(result => dispatch({ type: "DELETED_TEAM_ACTION", id: result }));
    };
}
