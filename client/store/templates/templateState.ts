import { ITemplate } from '../../models/inventory';

export interface ITemplatesState {
    readonly selectedTemplate?: ITemplate;
    readonly templates: ITemplate[];
    readonly isLoading: boolean;
    readonly errorMessage?: string;
}

export class TemplatesState implements ITemplatesState {
    readonly selectedTemplate?: ITemplate;
    readonly templates: ITemplate[] = [];
    readonly isLoading: boolean;
    readonly errorMessage?: string;

    constructor(prevState: ITemplatesState) {
        this.selectedTemplate = prevState.selectedTemplate;
        this.templates = prevState.templates;
        this.isLoading = prevState.isLoading;
        this.errorMessage = prevState.errorMessage;
    }

    static initialState() {
        return new TemplatesState({
            selectedTemplate: undefined,
            templates: [],
            isLoading: false,
            errorMessage: undefined
        });
    }
}
