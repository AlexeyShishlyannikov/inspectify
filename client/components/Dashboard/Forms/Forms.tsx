import './Forms.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { IForm } from '../../../models/Form';
import { ApplicationState } from '../../../store';
import { FormThunks } from '../../../store/form/formThunks';
import FormsList from './FormsList';

interface IFormsProps {
    forms: IForm[];
    selectedForm?: IForm;
    isLoading: boolean;
    errorMessage?: string;
    searchForms: (searchTerm: string) => void;
}

class Forms extends React.Component<IFormsProps> {
    componentWillMount() {
        this.props.searchForms('');
    }

    render() {
        return (
            <div className="dashboard-forms">
                <FormsList></FormsList>
            </div>
        )
    }
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedForm: state.forms.selectedForm,
        forms: state.forms.forms,
        isLoading: state.authentication.isLoading,
        errorMessage: state.authentication.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchForms: (searchTerm: string) => dispatch(FormThunks.searchForms(searchTerm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
