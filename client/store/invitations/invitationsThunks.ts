import { IInvitation } from '../../models/invitation';

import { ApplicationState, AppThunkAction } from '..';
import {
    IDeletedInvitationAction,
    ILoadedInvitationAction,
    ILoadedInvitationsAction,
    ISentInvitaionAction,
    IUpdatedInvitationAction,
    IUpdateInvitationLoadingAction,
} from './invitationsActions';
import { ActionsUtil } from '../actionsUtil';

export namespace InvitationThunks {
    export const getInvitations = (): AppThunkAction<ILoadedInvitationsAction | IUpdateInvitationLoadingAction> => async (dispatch, getState: () => ApplicationState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/invitations/getInvitations',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_INVITATIONS_ACTION", invitations: result }));
    };

    export const getInvitation = (id: string): AppThunkAction<ILoadedInvitationAction | IUpdateInvitationLoadingAction> => async (dispatch, getState: () => ApplicationState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/invitations?id=' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_INVITATION_ACTION", invitation: result }));
    };

    export const updateInvitation = (invitation: IInvitation): AppThunkAction<IUpdatedInvitationAction | IUpdateInvitationLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/invitations/update',
            {
                body: JSON.stringify(invitation),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_INVITATION_ACTION", invitation: result }));
    };

    export const deleteInvitation = (id: string): AppThunkAction<IDeletedInvitationAction | IUpdateInvitationLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/invitations/delete?id=' + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                },
            }
        ).then(res => res.text())
            .then(result => dispatch({ type: "DELETED_INVITATION_ACTION", id: result }));
    };

    export const sendInvitation = (invitation: IInvitation): AppThunkAction<ISentInvitaionAction | IUpdateInvitationLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/invitations/send',
            {
                body: JSON.stringify(invitation),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "SENT_INVITATION_ACTION", invitation: result }));
    };
}
