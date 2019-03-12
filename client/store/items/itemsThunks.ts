import { AppThunkAction } from '..';
import { IItem } from '../../models/inventory';
import {
    IDeletedItemAction,
    ILoadedItemsAction,
    IUpdatedItemAction,
    IUpdateItemLoadingAction,
    ILoadedItemAction,
    IAddedItemAction
} from './ItemsActions';
import { ActionsUtil } from '../actionsUtil';

export namespace ItemsThunks {
    export const searchItems = (searchTerm: string): AppThunkAction<ILoadedItemsAction | IUpdateItemLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_ITEMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/inventory/items?searchTerm=' + searchTerm,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_ITEMS_ACTION", items: result }));
    };

    export const getItem = (id: string): AppThunkAction<ILoadedItemAction | IUpdateItemLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_ITEMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/inventory/items/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "LOADED_ITEM_ACTION", item: result }));
    };

    export const createItem = (item: IItem): AppThunkAction<IAddedItemAction | IUpdateItemLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_ITEMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/inventory/items',
            {
                body: JSON.stringify(item),
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "ADDED_ITEM_ACTION", item: result }));
    };

    export const updateItem = (item: IItem): AppThunkAction<IUpdatedItemAction | IUpdateItemLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_ITEMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/inventory/items',
            {
                body: JSON.stringify(item),
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                }
            }
        ).then(res => res.json())
            .then(result => dispatch({ type: "UPDATED_ITEM_ACTION", item: result }));
    };

    export const deleteItem = (id: string): AppThunkAction<IDeletedItemAction | IUpdateItemLoadingAction> => async (dispatch, getState) => {
        dispatch({
            type: "UPDATE_ITEMS_LOADING_ACTION",
            status: true
        });
        const token = await ActionsUtil.refreshToken(dispatch, getState());
        fetch(
            window.location.origin + '/api/inventory/items/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token.token
                },
            }
        ).then(res => res.text())
            .then(result => dispatch({ type: "DELETED_ITEM_ACTION", id: result }));
    };
}
