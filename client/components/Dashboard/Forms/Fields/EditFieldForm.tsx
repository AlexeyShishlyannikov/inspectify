import './EditFieldForm.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { FieldType, IField, IOption } from '../../../../models/form';
import React = require('react');
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface IEditFieldFormProps {
    field?: IField;
    onSave?: (field: IField) => void;
    onClose?: () => void;
}

interface IEditFieldFormState {
    name: string;
    description: string;
    type: FieldType;
    sortIndex: number;
    isRequired: boolean;
    options: IOption[];
}

class EditFormView extends React.Component<IEditFieldFormProps, IEditFieldFormState> {
    componentWillMount() {
        this.setState({
            name: this.props.field ? this.props.field.name : '',
            description: this.props.field && this.props.field.description ? this.props.field.description : ''
        });
    }

    saveField = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.onSave) {
            this.props.onSave({
                id: this.props.field ? this.props.field.id : undefined,
                name: this.state.name,
                description: this.state.description,
                isRequired: this.state.isRequired,
                options: this.state.options,
                sortIndex: 0,
                type: FieldType.Input
            });
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

    isButtonDisabled = () => !this.state.name;

    getSubmitButton = () => {
        return <Button
            type="submit"
            color="primary"
            disabled={this.isButtonDisabled()}
            variant={this.isButtonDisabled() ? 'text' : 'contained'}>
            Save
        </Button>;
    };

    render() {
        return (
            <Card>
                <form className="form-view-form" onSubmit={event => this.saveField(event)}>
                    <CardHeader
                        title={(!this.props.field ? 'Add' : 'Edit') + ' Field'}
                        action={
                            this.props.onClose && <IconButton color="secondary" onClick={this.props.onClose}>
                                <CloseIcon />
                            </IconButton>
                        } />
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
                    <CardActions>{this.getSubmitButton()}</CardActions>
                </form>
            </Card>
        );
    }
}

export default (EditFormView)
