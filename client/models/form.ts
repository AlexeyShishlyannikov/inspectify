export interface IForm {
    id?: string;
    name: string;
    description: string;
    isArchived?: boolean;
    created?: Date;
    fields: IField[];
}

export interface IField {
    id?: string;
    name: string;
    description: string;
    sortIndex: number;
    isRequired: boolean;
    type: FieldType;
    options: IOption[];
}

export interface IOption {
    id?: string;
    value: string;
}

export enum FieldType {
    Input,
    Textarea,
    Radio,
    Select,
    Multiselect,
    Checkbox,
    Photo
}

export namespace FormUtil {
    export const getInputString = (type: FieldType) => {
        switch (type) {
            case FieldType.Input:
                return 'Text';
            case FieldType.Textarea:
                return 'Long Text';
            case FieldType.Radio:
                return 'Option Button';
            case FieldType.Select:
                return 'Single Selection';
            case FieldType.Multiselect:
                return 'Multiple Selection';
            case FieldType.Checkbox:
                return 'Checkbox';
            case FieldType.Photo:
                return 'Photo';
        }
    }
}