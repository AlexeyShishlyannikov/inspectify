export interface IReportForm {
    id: string;
    name: string;
    descriotion: string;
    created: Date;
    updated?: Date;
    isArchived: boolean;
    formFields: IReportFormInput[];
}

export interface IReportFormInput {
    id: string;
    name: string;
    description: string;
    isRequired: boolean;
    type: ReportFormInputType;
}

export interface IReportFormInputValue {
    id: string;
    textValue: string;
    numberValue: number;
    photoValue: any;
}

export enum ReportFormInputType {
    Text,
    Number,
    Photo
}
