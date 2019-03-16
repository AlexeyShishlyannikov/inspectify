import { Action, Reducer } from 'redux';

import { FormAction } from './FormActions';
import { FormsState } from './FormState';
import { ActionsUtil } from '../actionsUtil';

export const formsReducer: Reducer<FormsState> = (
    state: FormsState = FormsState.initialState(),
    incomingAction: Action
) => {
    const action = incomingAction as FormAction;
    switch (action.type) {
        case 'LOADED_FORMS_ACTION':
            return new FormsState({
                selectedForm: state.selectedForm && action.forms.find(p => !!state.selectedForm && p.id === state.selectedForm.id)
                    ? state.selectedForm
                    : undefined,
                forms: action.forms,
                isLoading: false,
                errorMessage: undefined
            });
        case 'SELECT_FORM_ACTION':
            return new FormsState({
                selectedForm: action.selectedForm,
                forms: state.forms,
                isLoading: false,
                errorMessage: undefined
            });
        case 'LOADED_FORM_ACTION':
            return new FormsState({
                selectedForm: action.form,
                forms: state.forms,
                isLoading: false,
                errorMessage: undefined
            });
        case 'ADDED_FORM_ACTION':
            return new FormsState({
                selectedForm: ActionsUtil.getSelectedValueUtil(state.selectedForm, action.form),
                forms: state.forms.concat(action.form),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATED_FORM_ACTION':
            return new FormsState({
                selectedForm: ActionsUtil.getSelectedValueUtil(state.selectedForm, action.form),
                forms: ActionsUtil.updateListUtil(action.form, state.forms),
                isLoading: false,
                errorMessage: undefined
            });
        case 'DELETED_FORM_ACTION':
            return new FormsState({
                selectedForm: state.selectedForm && state.selectedForm.id === action.id ? undefined : state.selectedForm,
                forms: state.forms.filter(inv => inv.id !== action.id),
                isLoading: false,
                errorMessage: undefined
            });
        case 'UPDATE_FORMS_LOADING_ACTION':
            return new FormsState({
                selectedForm: state.selectedForm,
                forms: state.forms,
                isLoading: action.status,
                errorMessage: undefined
            });
        // case "SWITCH_EDIT_FORM_MODE_ACTION":
        //     return new FormState({
        //         selectedForm: state.selectedForm,
        //         Forms: state.forms,
        //         isLoading: state.isLoading,
        //         errorMessage: undefined
        //     });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            return state;
    }
};
