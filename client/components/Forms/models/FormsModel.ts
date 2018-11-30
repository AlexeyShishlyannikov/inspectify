export interface IForm {
    id: string;
    name: string;
    teamId: string;
    inputs: IFormInput[];
}

export interface IFormInput {
    id?: number;
    name: string;
    isRequired: boolean;
    inputType: FormInputType;
    value: IFormInputValue;
}

export interface IFormInputValue {
    id?: number;
    textValue: string;
    numberValue: number;
}

export enum FormInputType {
    Text,
    Number
}
