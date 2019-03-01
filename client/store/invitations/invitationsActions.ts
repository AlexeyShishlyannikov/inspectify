import { Action } from 'redux';

import { IInvitation } from '../../models/invitation';

export type InvitationAction = ILoadedInvitationsAction 
    | IUpdatedInvitationAction
    | IUpdateInvitationLoadingAction
    | ISelectInvitationAction
    | IDeletedInvitationAction
    | ISentInvitaionAction
    | ILoadedInvitationAction;

export type LOADED_INVITATIONS_ACTION = "LOADED_INVITATIONS_ACTION";
export type LOADED_INVITATION_ACTION = "LOADED_INVITATION_ACTION";
export type SELECT_INVITATION_ACTION = "SELECT_INVITATION_ACTION";
export type UPDATED_INVITATION_ACTION = "UPDATED_INVITATION_ACTION";
export type DELETED_INVITATION_ACTION = "DELETED_INVITATION_ACTION";
export type UPDATE_INVITATION_LOADING_ACTION = "UPDATE_INVITATION_LOADING_ACTION";
export type SENT_INVITATION_ACTION = "SENT_INVITATION_ACTION";

export interface ISelectInvitationAction extends Action {
    type: SELECT_INVITATION_ACTION;
    selectedInvitation: IInvitation;
}

export interface ISentInvitaionAction extends Action {
    type: SENT_INVITATION_ACTION;
    invitation: IInvitation;
}

export interface ILoadedInvitationsAction extends Action {
    type: LOADED_INVITATIONS_ACTION;
    invitations: IInvitation[];
}

export interface ILoadedInvitationAction extends Action {
    type: LOADED_INVITATION_ACTION;
    invitation: IInvitation;
}

export interface IDeletedInvitationAction extends Action {
    type: DELETED_INVITATION_ACTION;
    id: string;
}

export interface IUpdatedInvitationAction extends Action {
    type: UPDATED_INVITATION_ACTION;
    invitation: IInvitation;
}

export interface IUpdateInvitationLoadingAction extends Action {
    type: UPDATE_INVITATION_LOADING_ACTION;
    status: boolean;
}