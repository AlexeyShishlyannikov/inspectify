import { ITemplate, IProperty } from '../../models/inventory';

export interface ITemplatesState {
    readonly selectedTemplate?: ITemplate;
    readonly templates: ITemplate[];
    readonly properties: IProperty[];
    readonly isLoading: boolean;
    readonly isPropertiesLoading: boolean;
    readonly errorMessage?: string;
}

export class TemplatesState implements ITemplatesState {
    readonly selectedTemplate?: ITemplate;
    readonly templates: ITemplate[] = [];
    readonly properties: IProperty[] = [];
    readonly isLoading: boolean;
    readonly isPropertiesLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: ITemplatesState) {
        this.selectedTemplate = prevState.selectedTemplate;
        this.templates = prevState.templates;
        this.properties = prevState.properties;
        this.isLoading = prevState.isLoading;
        this.isPropertiesLoading = prevState.isPropertiesLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new TemplatesState({
            selectedTemplate: undefined,
            templates: [],
            properties: [],
            isLoading: false,
            isPropertiesLoading: false,
            errorMessage: undefined
        });
    }
}
