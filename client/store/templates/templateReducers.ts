import { Action, Reducer } from 'redux';

import { ActionsUtil } from '../actionsUtil';
import { TemplatesState } from './templateState';
import { TemplateAction } from './templateActions';

export const templatesReducer: Reducer<TemplatesState> = (
    state: TemplatesState = TemplatesState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as TemplateAction;
    switch (action.type) {
        case 'LOADED_TEMPLATES_ACTION':
            return new TemplatesState({
                selectedTemplate: state.selectedTemplate && action.templates.find(p => !!state.selectedTemplate && p.id === state.selectedTemplate.id)
                    ? state.selectedTemplate
                    : undefined,
                templates: action.templates,
                isLoading: false,
                errorMessage: undefined
            });
        case 'SELECT_TEMPLATE_ACTION':
            return new TemplatesState({
                selectedTemplate: action.selectedTemplate,
                templates: state.templates,
                isLoading: false,
                errorMessage: undefined
            });
        case 'LOADED_TEMPLATE_ACTION':
            return new TemplatesState({
                selectedTemplate: action.template,
                templates: state.templates,
                isLoading: false,
                errorMessage: undefined
            });
        case 'ADDED_TEMPLATE_ACTION':
            return new TemplatesState({
                selectedTemplate: ActionsUtil.getSelectedValueUtil(state.selectedTemplate, action.template),
                templates: state.templates.concat(action.template),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATED_TEMPLATE_ACTION':
            return new TemplatesState({
                selectedTemplate: ActionsUtil.getSelectedValueUtil(state.selectedTemplate, action.template),
                templates: ActionsUtil.updateListUtil(action.template, state.templates),
                isLoading: false,
                errorMessage: undefined
            });
        case 'DELETED_TEMPLATE_ACTION':
            return new TemplatesState({
                selectedTemplate: state.selectedTemplate && state.selectedTemplate.id === action.id ? undefined : state.selectedTemplate,
                templates: state.templates.filter(inv => inv.id !== action.id),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATE_TEMPLATES_LOADING_ACTION':
            return new TemplatesState({
                selectedTemplate: state.selectedTemplate,
                templates: state.templates,
                isLoading: action.status,
                errorMessage: undefined
            });
        // case "SWITCH_EDIT_TEMPLATE_MODE_ACTION":
        //     return new Templatetate({
        //         selectedTemplate: state.selectedTemplate,
        //         Template: state.Template,
        //         isLoading: state.isLoading,
        //         errorMessage: undefined
        //     });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
