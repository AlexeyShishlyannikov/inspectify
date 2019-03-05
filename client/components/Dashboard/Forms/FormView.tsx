import './FormView.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, RouteProps } from 'react-router-dom';

import { IForm } from '../../../models/Form';
import { ApplicationState } from '../../../store';
import { FormThunks } from '../../../store/form/formThunks';

interface IFormViewProps {
    isEditMode: boolean;
    selectedForm?: IForm;
    isLoading: boolean;
    errorMessage?: string;
    getForm: (id: string) => void;
    // getPeopleForForm: (FormId: string) => void;
    deleteForm: (id: string) => void;
    setEditMode: (isEdit: boolean) => void;
}

class FormView extends React.Component<IFormViewProps & RouteComponentProps & RouteProps> {
    componentWillMount() {
        const id: string = this.props.match.params['id'];
        this.props.getForm(id);
        // this.props.getPeopleForForm(id);
        this.props.setEditMode(false);
    }

    render() {
        return (
            <div className="form-container">
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedForm: state.forms.selectedForm,
        isLoading: state.forms.isLoading,
        errorMessage: state.forms.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getForm: (id: string) => dispatch(FormThunks.getForm(id)),
        deleteForm: (id: string) => dispatch(FormThunks.deleteForm(id)),
        // getPeopleForForm: (FormId: string) => dispatch(PeopleThunks.getPeopleForForm(FormId, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormView);
