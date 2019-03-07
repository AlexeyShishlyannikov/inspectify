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
import FieldPreview from './Fields/FieldPreview';

interface IEditFormViewProps {
    isEditMode: boolean;

    selectedForm?: IForm;
    isLoading: boolean;
    errorMessage?: string;
    getForm: (id: string) => void;
    addForm: (form: IForm) => void;
    updateForm: (form: IForm) => void;
    onSave?: () => void;
}

interface IEditFormViewState {
    name: string;
    description: string;
    isAdding: boolean;
    fields: IField[];
    fieldEditingMap: { [id: string]: boolean }
}

class EditFormView extends React.Component<IEditFormViewProps & RouteComponentProps & RouteProps, IEditFormViewState> {
    componentWillMount() {
        if (this.props.isEditMode) {
            const id: string = this.props.match.params['id'];
            this.props.getForm(id);
        }
        this.setState({
            name: this.props.isEditMode && this.props.selectedForm ? this.props.selectedForm.name : '',
            description: this.props.isEditMode && this.props.selectedForm && this.props.selectedForm.description ? this.props.selectedForm.description : '',
            fields: this.props.isEditMode && this.props.selectedForm ? this.props.selectedForm.fields : [],
            isAdding: false,
            fieldEditingMap: {}
        });
    }

    componentWillReceiveProps(newProps: IEditFormViewProps) {
        if (newProps.selectedForm && newProps.selectedForm !== this.props.selectedForm && newProps.isEditMode) {
            this.setState({
                name: newProps.selectedForm.name,
                description: newProps.selectedForm.description,
                fields: newProps.selectedForm ? newProps.selectedForm.fields : [],
                isAdding: false,
                fieldEditingMap: {}
            });
        }
    }

    createForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.addForm({
            name: this.state.name,
            description: this.state.description,
            fields: this.state.fields
        });
    };

    updateForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.selectedForm) {
            this.props.updateForm({
                id: this.props.selectedForm.id,
                name: this.state.name,
                description: this.state.description,
                fields: this.state.fields
            });
        }
    };

    updateEditingState = (id: string, isEditing: boolean) => {
        this.setState((state) => {
            const newEditingState = {
                ...state.fieldEditingMap,
                [id]: isEditing
            };
            return {
                fieldEditingMap: newEditingState
            }
        });
    }

    handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    addField = () => {
        this.setState({
            isAdding: true
        });
    }

    onFieldSave = (field: IField) => {
        this.setState({
            fields: field.id
                ? this.adjustSortIndexes(this.state.fields.map(savedField => savedField.id === field.id ? field : savedField))
                : this.state.fields.concat({ ...field, sortIndex: this.state.fields.length + 1 }),
            isAdding: false
        });
        if (field.id) {
            this.updateEditingState(field.id, false);
        }
    }

    isButtonDisabled = () => !this.state.name || this.state.fields.length === 0 || this.props.isLoading;

    adjustSortIndexes = (fields: IField[]) => {
        return fields.sort((f1, f2) => f1.sortIndex - f2.sortIndex).map((field, index) => ({
            ...field,
            sortIndex: index + 1
        }));
    }

    render() {
        return (
            <div className="form-view-form-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <form className="form-view-form" onSubmit={(event) => {
                    event.preventDefault();
                    if (this.props.isEditMode) {
                        this.updateForm(event);
                    } else {
                        this.createForm(event);
                    }
                    if (this.props.onSave) {
                        this.props.onSave();
                    }
                }}>
                    <Card>
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
                    </Card>
                    <br />
                    {this.state.fields.length > 0 && <CardHeader title="Fields" />}
                    {this.state.fields.map(field => {
                        if (this.state.fieldEditingMap[field.id as string]) {
                            return <div key={field.id} className="form-view-form-panel">
                                <EditFieldForm
                                    field={field}
                                    onClose={() => this.updateEditingState(field.id as string, false)}
                                    onSave={this.onFieldSave}
                                    onDelete={(deletedField: IField) => this.setState({
                                        fields: this.adjustSortIndexes(this.state.fields.filter(stateField => stateField.id !== deletedField.id))
                                    })}
                                />
                            </div>
                        }
                        return <div key={field.id} className="form-view-form-panel"><FieldPreview field={field} onEditClick={() => this.updateEditingState(field.id as string, true)} /></div>
                    })}
                    {this.state.isAdding &&
                        <div className="form-view-form-panel">
                            <EditFieldForm
                                onClose={() => this.setState({ isAdding: false })}
                                onSave={this.onFieldSave}
                            />
                        </div>}
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                        {!this.state.isAdding && <Button color="primary" variant='contained' onClick={this.addField}> Add Field</Button>}
                        <br />
                        <Button
                            type="submit"
                            color="primary"
                            disabled={this.isButtonDisabled()}
                            variant={this.isButtonDisabled() ? 'text' : 'contained'}
                        >
                            {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Save Form'}
                        </Button>
                    </div>
                </form>
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
