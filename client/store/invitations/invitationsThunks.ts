import { ICompany } from '../../models/company';

import { ApplicationState, AppThunkAction } from '..';
import { ILoadedInvitationsAction, IUpdateInvitationLoadingAction, IUpdatedInvitationAction, ISentInvitaionAction } from './invitationsActions';
import { IUpdateCompanyLoadingAction } from '../company/companyActions';
import { IInvitation } from 'client/models/invitation';

export namespace InvitationThunks {
    export const getInvitations = (): AppThunkAction<ILoadedInvitationsAction | IUpdateInvitationLoadingAction> => (dispatch, getState: () => ApplicationState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/invitations/getInvitations',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_INVITATIONS_ACTION", invitations: result }));
    };

    export const updateInvitation = (invitation: IInvitation): AppThunkAction<IUpdatedInvitationAction | IUpdateInvitationLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/invitations/update',
            {
                body: JSON.stringify(invitation),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_INVITATION_ACTION", invitation: result }));
    };

    export const sendInvitation = (invitation: IInvitation): AppThunkAction<ISentInvitaionAction | IUpdateInvitationLoadingAction> => (dispatch, getState) => {
        dispatch({
            type: "UPDATE_INVITATION_LOADING_ACTION",
            status: true
        });
        fetch(
            window.location.origin + '/api/invitations/send',
            {
                body: JSON.stringify(invitation),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "SENT_INVITATION_ACTION", invitation: result }));
    };
}
