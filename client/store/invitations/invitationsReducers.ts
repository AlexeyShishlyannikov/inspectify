import { InvitaionsState } from "./invitationsState";
import { Action, Reducer } from "redux";
import { InvitationAction } from "./invitationsActions";
import { IInvitation } from "../../models/invitation";

export const invitationsReducer: Reducer<InvitaionsState> = (
    state: InvitaionsState = InvitaionsState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as InvitationAction;
    switch (action.type) {
        case 'LOADED_INVITATION_ACTION':
            return new InvitaionsState({
                selectedInvitation: action.invitation,
                invitations: state.invitations,
                isLoading: false,
                errorMessage: undefined
            });
        case 'LOADED_INVITATIONS_ACTION':
            return new InvitaionsState({
                selectedInvitation: state.selectedInvitation && action.invitations.find(i => i.id === state.selectedInvitation)
                    ? state.selectedInvitation
                    : undefined,
                invitations: action.invitations,
                isLoading: false,
                errorMessage: undefined
            });
        case 'SELECT_INVITATION_ACTION':
            return new InvitaionsState({
                selectedInvitation: action.selectedInvitation,
                invitations: state.invitations,
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATED_INVITATION_ACTION':
            let selectedInvitation: IInvitation | undefined;
            if (state.selectedInvitation && state.selectedInvitation.id === action.invitation.id) {
                selectedInvitation = action.invitation;
            } else {
                selectedInvitation = state.selectedInvitation;
            }
            return new InvitaionsState({
                selectedInvitation: selectedInvitation,
                invitations: state.invitations.map(i => i.id === action.invitation.id ? action.invitation : i),
                isLoading: false,
                errorMessage: undefined
            });
        case 'SENT_INVITATION_ACTION':
            return new InvitaionsState({
                selectedInvitation: undefined,
                invitations: state.invitations.concat(action.invitation),
                isLoading: false,
                errorMessage: undefined
            });
        case 'DELETED_INVITATION_ACTION':
            return new InvitaionsState({
                selectedInvitation: state.selectedInvitation && state.selectedInvitation.id === action.id ? undefined : state.selectedInvitation,
                invitations: state.invitations.filter(inv => inv.id !== action.id),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATE_INVITATION_LOADING_ACTION':
            return new InvitaionsState({
                selectedInvitation: state.selectedInvitation,
                invitations: state.invitations,
                isLoading: action.status,
                errorMessage: undefined
            });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
