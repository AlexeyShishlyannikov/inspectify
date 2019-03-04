import { ITeam } from '../../models/Team';

export interface ITeamsState {
    readonly isEditMode: boolean;
    readonly selectedTeam?: ITeam;
    readonly teams: ITeam[];
    readonly isLoading: boolean;
    readonly errorMessage?: string;
}

export class TeamsState implements ITeamsState {
    readonly isEditMode: boolean;
    readonly selectedTeam?: ITeam;
    readonly teams: ITeam[] = [];
    readonly isLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: ITeamsState) {
        this.isEditMode = prevState.isEditMode;
        this.selectedTeam = prevState.selectedTeam;
        this.teams = prevState.teams;
        this.isLoading = prevState.isLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new TeamsState({
            isEditMode: false,
            selectedTeam: undefined,
            teams: [],
            isLoading: false,
            errorMessage: undefined
        });
    }
}
