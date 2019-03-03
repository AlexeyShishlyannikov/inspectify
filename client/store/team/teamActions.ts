import { Action } from 'redux';

import { ITeam } from '../../models/Team';

export type TeamAction =
    | ILoadedTeamAction
    | ILoadedTeamsAction
    | ISelectTeamAction
    | IAddedTeamAction
    | IUpdatedTeamAction
    | IDeletedTeamAction
    | IUpdateTeamLoadingAction
    | ISwitchEditTeamModeAction

export type LOADED_TEAMS_ACTION = "LOADED_TEAMS_ACTION";
export type SELECT_TEAM_ACTION = "SELECT_TEAM_ACTION";
export type UPDATED_TEAM_ACTION = "UPDATED_TEAM_ACTION";
export type DELETED_TEAM_ACTION = "DELETED_TEAM_ACTION";
export type UPDATE_TEAMS_LOADING_ACTION = "UPDATE_TEAMS_LOADING_ACTION";
export type LOADED_TEAM_ACTION = "LOADED_TEAM_ACTION";
export type ADDED_TEAM_ACTION = "ADDED_TEAM_ACTION";
export type SWITCH_EDIT_TEAM_MODE_ACTION = "SWITCH_EDIT_TEAM_MODE_ACTION";

export interface ILoadedTeamAction extends Action {
    type: LOADED_TEAM_ACTION;
    team: ITeam;
}

export interface ILoadedTeamsAction extends Action {
    type: LOADED_TEAMS_ACTION;
    teams: ITeam[];
}

export interface ISelectTeamAction extends Action {
    type: SELECT_TEAM_ACTION;
    selectedTeam: ITeam;
}

export interface IAddedTeamAction extends Action {
    type: ADDED_TEAM_ACTION;
    team: ITeam;
}

export interface IUpdatedTeamAction extends Action {
    type: UPDATED_TEAM_ACTION;
    team: ITeam;
}

export interface IDeletedTeamAction extends Action {
    type: DELETED_TEAM_ACTION;
    id: string;
}

export interface IUpdateTeamLoadingAction extends Action {
    type: UPDATE_TEAMS_LOADING_ACTION;
    status: boolean;
}

export interface ISwitchEditTeamModeAction extends Action {
    type: SWITCH_EDIT_TEAM_MODE_ACTION;
    status: boolean;
}
