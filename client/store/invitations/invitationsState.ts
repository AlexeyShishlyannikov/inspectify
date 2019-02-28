import { IInvitation } from "client/models/invitation";

export interface IInvitaionsState {
    readonly selectedInvitation?: IInvitation;
    readonly invitations: IInvitation[];
    readonly isLoading: boolean;
    readonly errorMessage?: string;
}

export class InvitaionsState implements IInvitaionsState {
    readonly selectedInvitation?: IInvitation;
    readonly invitations: IInvitation[] = [];
    readonly isLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: IInvitaionsState) {
        this.selectedInvitation = prevState.selectedInvitation;
        this.invitations = prevState.invitations;
        this.isLoading = prevState.isLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new InvitaionsState({
            selectedInvitation: undefined,
            invitations: [],
            isLoading: false,
            errorMessage: undefined
        });
    }
}
