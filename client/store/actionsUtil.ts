import { ApplicationState } from ".";

let jwtDecode = require('jwt-decode');

export namespace ActionsUtil {
    export interface DefaultType {
        id?: string
    };

    export const getSelectedValueUtil = <T extends DefaultType>(stateValue: T | undefined, actionValue: T): T => {
        let selectedTeam: T;
        if (!stateValue || stateValue.id === actionValue.id) {
            selectedTeam = actionValue;
        } else {
            selectedTeam = stateValue;
        }
        return selectedTeam;
    };

    export const updateListUtil = <T extends DefaultType>(actionValue: T, stateArray: T[]) => {
        return stateArray.map(value => value.id === actionValue.id ? actionValue : value);
    }

    export const refreshToken = (state: ApplicationState): Promise<{
        token: string,
        refreshToken: string
    }> => {
        const token = localStorage.getItem('token') as string;
        const refreshToken = localStorage.getItem('refreshToken') as string;
        if (state.authentication.user && state.authentication.user.expirationDate - 1000 > new Date().getTime()) {
            return new Promise((res) => res({
                token,
                refreshToken
            }));
        }
        return fetch(window.location.origin + `/api/account/refresh?token=${token}&refreshToken${refreshToken}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                }
            }
        ).then(res => res.json());
    }
}
