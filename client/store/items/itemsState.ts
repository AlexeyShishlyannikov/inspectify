import { IItem } from '../../models/inventory';

export interface IItemsState {
    readonly selectedItem?: IItem;
    readonly items: IItem[];
    readonly isLoading: boolean;
    readonly errorMessage?: string;
}

export class ItemsState implements IItemsState {
    readonly selectedItem?: IItem;
    readonly items: IItem[] = [];
    readonly isLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: IItemsState) {
        this.selectedItem = prevState.selectedItem;
        this.items = prevState.items;
        this.isLoading = prevState.isLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new ItemsState({
            selectedItem: undefined,
            items: [],
            isLoading: false,
            errorMessage: undefined
        });
    }
}
