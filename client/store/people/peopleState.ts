import { IPerson } from '../../models/person';

export interface IPeopleState {
    readonly selectedPerson?: IPerson;
    readonly people: IPerson[];
    readonly isLoading: boolean;
    readonly errorMessage?: string;
}

export class PeopleState implements IPeopleState {
    readonly selectedPerson?: IPerson;
    readonly people: IPerson[] = [];
    readonly isLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: IPeopleState) {
        this.selectedPerson = prevState.selectedPerson;
        this.people = prevState.people;
        this.isLoading = prevState.isLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new PeopleState({
            selectedPerson: undefined,
            people: [],
            isLoading: false,
            errorMessage: undefined
        });
    }
}
