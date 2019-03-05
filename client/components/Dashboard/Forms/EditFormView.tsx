import './EditFormView.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { ApplicationState } from '../../../store';
import { FormThunks } from '../../../store/form/formThunks';
import * as React from 'react';
import { connect } from 'react-redux';

import { IForm, IField, FieldType } from '../../../models/form';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import EditFieldForm from './Fields/EditFieldForm';

interface IEditFormsFormProps {
    isEditMode: boolean;

    selectedForm?: IForm;
    isLoading: boolean;
    errorMessage?: string;
    getForm: (id: string) => void;
    addForm: (form: IForm) => void;
    updateForm: (form: IForm) => void;
    onSave?: () => void;
}

interface IEditFormsFormState {
    name: string;
    description: string;
    fields: IField[];
}

class EditFormView extends React.Component<IEditFormsFormProps & RouteComponentProps & RouteProps, IEditFormsFormState> {
    componentWillMount() {
        if (this.props.isEditMode) {
            const id: string = this.props.match.params['id'];
            this.props.getForm(id);
        }
        this.setState({
            name: this.props.isEditMode && this.props.selectedForm ? this.props.selectedForm.name : '',
            description: this.props.isEditMode && this.props.selectedForm && this.props.selectedForm.description ? this.props.selectedForm.description : '',
            fields: this.props.isEditMode && this.props.selectedForm ? this.props.selectedForm.fields : []
        });
    }

    componentWillReceiveProps(newProps: IEditFormsFormProps) {
        if (newProps.selectedForm && newProps.selectedForm !== this.props.selectedForm && newProps.isEditMode) {
            this.setState({
                name: newProps.selectedForm.name,
                description: newProps.selectedForm.description
            });
        }
    }

    createForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // this.props.addForm({
        //     name: this.state.name,
        //     description: this.state.description
        // });
    };

    updateForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.selectedForm
            && (this.props.selectedForm.name !== this.state.name || this.props.selectedForm.description !== this.state.description)
        ) {
            // this.props.updateForm({
            //     id: this.props.selectedForm.id,
            //     name: this.state.name,
            //     description: this.state.description
            // });
        }
    };

    handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    isButtonDisabled = () => !this.state.name || this.props.isLoading;

    getSubmitButton = () => {
        return <Button
            type="submit"
            color="primary"
            disabled={this.isButtonDisabled()}
            variant={this.isButtonDisabled() ? 'text' : 'contained'}
        >
            {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Save'}
        </Button>;
    };

    render() {
        return (
            <div className="form-view-form-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <Card>
                    <form className="form-view-form" onSubmit={(event) => {
                        this.props.isEditMode ? this.updateForm(event) : this.createForm(event);
                        if (this.props.onSave) this.props.onSave();
                    }}>
                        <CardHeader title={(this.props.isEditMode ? 'Edit' : 'Create') + ' Form'} />
                        <CardContent className="form-view-form-content">
                            <FormControl className="form-view-form-input">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                />
                            </FormControl>
                            <FormControl className="form-view-form-input">
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Input
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                />
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            {<div style={{ 'color': 'red' }}> {this.props.errorMessage} </div>}
                            {this.getSubmitButton()}
                        </CardActions>
                    </form>
                </Card>
                <br />
                <Card>
                    <CardHeader title="Fields" />
                </Card>
                {this.state.fields.map(field => <div key={field.id}><br /><EditFieldForm field={field} /></div>)}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    <Button
                        color="primary"
                        variant='contained'
                        onClick={() => {
                            this.setState({
                                fields: this.state.fields.concat({
                                    name: '',
                                    description: '',
                                    isRequired: false,
                                    type: FieldType.Input,
                                    options: [],
                                    sortIndex: 0
                                })
                            });
                        }}>
                        Add Field
                    </Button>
                </div>
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
        addForm: (form: IForm) => dispatch(FormThunks.createForm(form)),
        updateForm: (form: IForm) => dispatch(FormThunks.updateForm(form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormView)
