import { User } from "../../models/Authentication";

export interface IAuthenticationState {
    readonly user?: User;
    readonly isAuthenticated: boolean;
    readonly isLoading: boolean;
    readonly errorMessage?: string;
}

export class AuthenticationState implements IAuthenticationState {
    readonly user?: User;
    readonly isAuthenticated: boolean;
    readonly isLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: IAuthenticationState) {
        this.user = prevState.user;
        this.isAuthenticated = prevState.isAuthenticated;
        this.isLoading = prevState.isLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new AuthenticationState({
            user: undefined,
            isAuthenticated: false,
            isLoading: false,
            errorMessage: undefined
        });
    }
}
