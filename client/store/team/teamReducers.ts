import { Action, Reducer } from 'redux';

import { TeamAction } from './teamActions';
import { TeamsState } from './teamState';
import { ActionsUtil } from '../actionsUtil';

export const teamsReducer: Reducer<TeamsState> = (
    state: TeamsState = TeamsState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as TeamAction;
    switch (action.type) {
        case 'LOADED_TEAMS_ACTION':
            return new TeamsState({
                selectedTeam: state.selectedTeam && action.teams.find(p => !!state.selectedTeam && p.id === state.selectedTeam.id)
                    ? state.selectedTeam
                    : undefined,
                teams: action.teams,
                isLoading: false,
                errorMessage: undefined,
                isEditMode: state.isEditMode
            });
        case 'SELECT_TEAM_ACTION':
            return new TeamsState({
                selectedTeam: action.selectedTeam,
                teams: state.teams,
                isLoading: false,
                errorMessage: undefined,
                isEditMode: state.isEditMode
            });
        case 'LOADED_TEAM_ACTION':
            return new TeamsState({
                selectedTeam: action.team,
                teams: state.teams,
                isLoading: false,
                errorMessage: undefined,
                isEditMode: state.isEditMode
            });
        case 'ADDED_TEAM_ACTION':
            return new TeamsState({
                selectedTeam: ActionsUtil.getSelectedValueUtil(state.selectedTeam, action.team),
                teams: state.teams.concat(action.team),
                isLoading: false,
                errorMessage: undefined,
                isEditMode: state.isEditMode
            });
        case 'UPDATED_TEAM_ACTION':
            return new TeamsState({
                selectedTeam: ActionsUtil.getSelectedValueUtil(state.selectedTeam, action.team),
                teams: ActionsUtil.updateListUtil(action.team, state.teams),
                isLoading: false,
                errorMessage: undefined,
                isEditMode: state.isEditMode
            });
        case 'DELETED_TEAM_ACTION':
            return new TeamsState({
                selectedTeam: state.selectedTeam && state.selectedTeam.id === action.id ? undefined : state.selectedTeam,
                teams: state.teams.filter(inv => inv.id !== action.id),
                isLoading: false,
                errorMessage: undefined,
                isEditMode: state.isEditMode
            });
        case 'UPDATE_TEAMS_LOADING_ACTION':
            return new TeamsState({
                selectedTeam: state.selectedTeam,
                teams: state.teams,
                isLoading: action.status,
                errorMessage: undefined,
                isEditMode: state.isEditMode
            });
        case "SWITCH_EDIT_TEAM_MODE_ACTION":
            return new TeamsState({
                selectedTeam: state.selectedTeam,
                teams: state.teams,
                isLoading: state.isLoading,
                errorMessage: undefined,
                isEditMode: action.status
            });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
