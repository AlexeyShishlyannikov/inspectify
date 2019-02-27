import { ICompany } from "../../models/company";

export interface ICompanyState {
    readonly company?: ICompany;
    readonly isLoading: boolean;
}

export class CompanyState implements ICompanyState {
    readonly company?: ICompany;
    readonly isLoading: boolean;

    constructor(prevState: ICompanyState) {
        this.company = prevState.company;
        this.isLoading = prevState.isLoading;
    }

    static initialState() {
        return new CompanyState({
            company: undefined,
            isLoading: false
        });
    }
}
