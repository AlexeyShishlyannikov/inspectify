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
    isRequired: boolean;
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
    value?: string;
}

export enum PropertyType {
    String,
    Number,
    Photo
}

export const getPropertyTypeString = (type: PropertyType) => {
    switch (type) {
        case PropertyType.Number:
            return 'Number';
        case PropertyType.String:
            return 'Text';
        case PropertyType.Photo:
            return 'Photo';
    }
};