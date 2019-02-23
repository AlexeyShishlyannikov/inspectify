import { User } from "client/models/Authentication";

export interface IAuthenticationState {
    readonly user?: User;
    readonly isAuthenticated: boolean;
    readonly isLoading: boolean;
}

export class AuthenticationState implements IAuthenticationState {
    readonly user?: User;
    readonly isAuthenticated: boolean;
    readonly isLoading: boolean;

    constructor(prevState: IAuthenticationState) {
        this.user = prevState.user;
        this.isAuthenticated = prevState.isAuthenticated;
        this.isLoading = prevState.isAuthenticated;
    }

    static initialState() {
        return new AuthenticationState({
            user: undefined,
            isAuthenticated: false,
            isLoading: false
        });
    }
}
