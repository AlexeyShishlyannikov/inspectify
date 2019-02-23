import { AuthenticationState } from "./authenticationState";
import { Reducer, Action } from "redux";
import { AuthenticationAction } from "./authenticationActions";
import { User } from "../../models/Authentication";

export const authReducer: Reducer<AuthenticationState> = (
    state: AuthenticationState = AuthenticationState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as AuthenticationAction;
    switch (action.type) {
        case 'LOADED_USER_ACTION':
            return new AuthenticationState({
                isAuthenticated: true,
                isLoading: false,
                user: new User(action.token)
            });
        case 'CHANGE_IS_LOADING_ACTION':
            return new AuthenticationState({
                isAuthenticated: state.isAuthenticated,
                isLoading: action.status,
                user: state.user
            });
        case 'RECEIVED_ERROR_ACTION':
            return new AuthenticationState({
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                user: state.user
            });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
