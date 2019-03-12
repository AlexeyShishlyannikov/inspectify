import { Action, Reducer } from 'redux';

import { ItemAction } from './ItemsActions';
import { ItemsState } from './ItemsState';
import { ActionsUtil } from '../actionsUtil';

export const itemsReducer: Reducer<ItemsState> = (
    state: ItemsState = ItemsState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as ItemAction;
    switch (action.type) {
        case 'LOADED_ITEMS_ACTION':
            return new ItemsState({
                selectedItem: state.selectedItem && action.items.find(p => !!state.selectedItem && p.id === state.selectedItem.id)
                    ? state.selectedItem
                    : undefined,
                items: action.items,
                isLoading: false,
                errorMessage: undefined
            });
        case 'SELECT_ITEM_ACTION':
            return new ItemsState({
                selectedItem: action.selectedItem,
                items: state.items,
                isLoading: false,
                errorMessage: undefined
            });
        case 'LOADED_ITEM_ACTION':
            return new ItemsState({
                selectedItem: action.item,
                items: state.items,
                isLoading: false,
                errorMessage: undefined
            });
        case 'ADDED_ITEM_ACTION':
            return new ItemsState({
                selectedItem: ActionsUtil.getSelectedValueUtil(state.selectedItem, action.item),
                items: state.items.concat(action.item),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATED_ITEM_ACTION':
            return new ItemsState({
                selectedItem: ActionsUtil.getSelectedValueUtil(state.selectedItem, action.item),
                items: ActionsUtil.updateListUtil(action.item, state.items),
                isLoading: false,
                errorMessage: undefined
            });
        case 'DELETED_ITEM_ACTION':
            return new ItemsState({
                selectedItem: state.selectedItem && state.selectedItem.id === action.id ? undefined : state.selectedItem,
                items: state.items.filter(inv => inv.id !== action.id),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATE_ITEMS_LOADING_ACTION':
            return new ItemsState({
                selectedItem: state.selectedItem,
                items: state.items,
                isLoading: action.status,
                errorMessage: undefined
            });
        // case "SWITCH_EDIT_ITEM_MODE_ACTION":
        //     return new ItemState({
        //         selectedItem: state.selectedItem,
        //         Items: state.Items,
        //         isLoading: state.isLoading,
        //         errorMessage: undefined
        //     });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
