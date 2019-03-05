export interface IForm {
    id?: string;
    name: string;
    description: string;
    isArchived: boolean;
    created: Date;
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
