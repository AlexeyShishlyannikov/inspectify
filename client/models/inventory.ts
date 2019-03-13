export interface ITemplate {
    id?: string;
    name: string;
    description: string;
    properties: IProperty[];
}

export interface IProperty {
    id?: number;
    name: string;
    type: PropertyType;
    sortIndex: number;
}

export interface IItem {
    id?: string;
    name: string;
    template: ITemplate;
    values: IItemValue[];
}

export interface IItemValue {
    id?: number;
    property: IProperty;
    value: string;
}

export enum PropertyType {
    String,
    Number,
    Photo
}
