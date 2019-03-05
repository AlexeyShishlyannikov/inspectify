import { IForm } from '../../models/Form';

export interface IFormsState {
    readonly selectedForm?: IForm;
    readonly forms: IForm[];
    readonly isLoading: boolean;
    readonly errorMessage?: string;
}

export class FormsState implements IFormsState {
    readonly selectedForm?: IForm;
    readonly forms: IForm[] = [];
    readonly isLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: IFormsState) {
        this.selectedForm = prevState.selectedForm;
        this.forms = prevState.forms;
        this.isLoading = prevState.isLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new FormsState({
            selectedForm: undefined,
            forms: [],
            isLoading: false,
            errorMessage: undefined
        });
    }
}
