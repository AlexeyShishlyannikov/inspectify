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
}
