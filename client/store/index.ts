import { AuthenticationState } from "./authentication/authenticationState";
import { authReducer } from "./authentication/authenticationReducers";

// The top-level state object
export interface ApplicationState {
    authentication: AuthenticationState;
    // vehicle:;
    // report:;
    // reportForm:;
    // company:;
    // team:;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    authentication: authReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (
        dispatch: (action: TAction) => void,
        getState: () => ApplicationState
    ): void;
}

export function getInitialState(): ApplicationState {
    const storedState = JSON.parse(localStorage.getItem('state') as string);
    if (storedState) {
        return storedState;
    }
    return {
        authentication: AuthenticationState.initialState()
    };
}