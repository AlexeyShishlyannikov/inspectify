import { Action } from 'redux';

import { IItem } from '../../models/inventory';

export type ItemAction =
    | ILoadedItemAction
    | ILoadedItemsAction
    | ISelectItemAction
    | IAddedItemAction
    | IUpdatedItemAction
    | IDeletedItemAction
    | IUpdateItemLoadingAction
// | ISwitchEditItemModeAction

export type SELECT_ITEM_ACTION = "SELECT_ITEM_ACTION";
export type ADDED_ITEM_ACTION = "ADDED_ITEM_ACTION";
export type LOADED_ITEM_ACTION = "LOADED_ITEM_ACTION";
export type LOADED_ITEMS_ACTION = "LOADED_ITEMS_ACTION";
export type UPDATED_ITEM_ACTION = "UPDATED_ITEM_ACTION";
export type DELETED_ITEM_ACTION = "DELETED_ITEM_ACTION";
export type UPDATE_ITEMS_LOADING_ACTION = "UPDATE_ITEMS_LOADING_ACTION";
// export type SWITCH_EDIT_ITEM_MODE_ACTION = "SWITCH_EDIT_ITEM_MODE_ACTION";

export interface ILoadedItemAction extends Action {
    type: LOADED_ITEM_ACTION;
    item: IItem;
}

export interface ILoadedItemsAction extends Action {
    type: LOADED_ITEMS_ACTION;
    items: IItem[];
}

export interface ISelectItemAction extends Action {
    type: SELECT_ITEM_ACTION;
    selectedItem?: IItem;
}

export interface IAddedItemAction extends Action {
    type: ADDED_ITEM_ACTION;
    item: IItem;
}

export interface IUpdatedItemAction extends Action {
    type: UPDATED_ITEM_ACTION;
    item: IItem;
}

export interface IDeletedItemAction extends Action {
    type: DELETED_ITEM_ACTION;
    id: string;
}

export interface IUpdateItemLoadingAction extends Action {
    type: UPDATE_ITEMS_LOADING_ACTION;
    status: boolean;
}

// export interface ISwitchEditItemModeAction extends Action {
//     type: SWITCH_EDIT_ITEM_MODE_ACTION;
//     status: boolean;
// }
