import './FormView.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, RouteProps } from 'react-router-dom';

import { IForm } from '../../../models/Form';
import { ApplicationState } from '../../../store';
import { FormThunks } from '../../../store/form/formThunks';

interface IFormViewProps {
    selectedForm?: IForm;
    isLoading: boolean;
    errorMessage?: string;
    getForm: (id: string) => void;
    deleteForm: (id: string) => void;
    // getPeopleForForm: (FormId: string) => void;
}

class FormView extends React.Component<IFormViewProps & RouteComponentProps & RouteProps> {
    componentWillMount() {
        const id: string = this.props.match.params['id'];
        this.props.getForm(id);
        // this.props.getPeopleForForm(id);
    }

    render() {
        return (
            <div className="form-container">
                {JSON.stringify(this.props.selectedForm)}
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
