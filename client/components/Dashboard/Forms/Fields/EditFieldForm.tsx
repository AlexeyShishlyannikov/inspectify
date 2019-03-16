import './EditFieldForm.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React = require('react');

import { FieldType, FormUtil, IField, IOption } from '../../../../models/form';
import FieldOptionsForm from './FieldOptionsForm';

interface IEditFieldFormProps {
    field?: IField;
    onSave?: (field: IField) => void;
    onDelete?: (field: IField) => void;
    onClose?: () => void;
}

interface IEditFieldFormState {
    name: string;
    description: string;
    type: FieldType;
    sortIndex: number;
    isRequired: boolean;
    optionValue: string;
    options: IOption[];
}

class EditFieldForm extends React.Component<IEditFieldFormProps, IEditFieldFormState> {
    componentWillMount() {
        this.setState({
            name: this.props.field ? this.props.field.name : '',
            description: this.props.field && this.props.field.description ? this.props.field.description : '',
            isRequired: this.props.field && this.props.field.isRequired ? this.props.field.isRequired : false,
            type: this.props.field && this.props.field.type ? this.props.field.type : FieldType.Input,
            sortIndex: this.props.field && this.props.field.sortIndex ? this.props.field.sortIndex : 0,
            options: this.props.field && this.props.field.options ? this.props.field.options : []
        });
    }

    saveField = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.props.onSave) {
            this.props.onSave({
                id: this.props.field ? this.props.field.id : undefined,
                name: this.state.name,
                description: this.state.description,
                isRequired: this.state.isRequired,
                options: this.state.options,
                sortIndex: this.state.sortIndex,
                type: this.state.type
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

    handleTypeSelection = (prop: string) => (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const value = +event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    get showOptionsInput(): boolean {
        const type = this.state.type;
        return type === FieldType.Checkbox || type === FieldType.Multiselect || type === FieldType.Radio || type === FieldType.Select;
    }

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

    getTypeSelectionOption = (type: FieldType) => {
        return <option value={type}>{FormUtil.getInputString(type)}</option>
    }

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
                        <FormControl className="form-view-form-input">
                            <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                            <Select
                                native
                                value={this.state.type}
                                onChange={this.handleTypeSelection('type')}
                            >
                                {this.getTypeSelectionOption(FieldType.Input)}
                                {this.getTypeSelectionOption(FieldType.Textarea)}
                                {this.getTypeSelectionOption(FieldType.Radio)}
                                {this.getTypeSelectionOption(FieldType.Select)}
                                {this.getTypeSelectionOption(FieldType.Multiselect)}
                                {this.getTypeSelectionOption(FieldType.Checkbox)}
                                {this.getTypeSelectionOption(FieldType.Photo)}
                            </Select>
                        </FormControl>
                        {this.showOptionsInput && <div>
                            <Typography variant="subtitle1">Add options</Typography>
                            <FieldOptionsForm options={this.state.options} onChange={(options: IOption[]) =>{ console.log(options); this.setState({ options: options })}} />
                        </div>}
                    </CardContent>
                    <CardActions>
                        {this.getSubmitButton()}
                        {this.props.field && this.props.onDelete && <Button onClick={() => this.props.onDelete && this.props.onDelete(this.props.field as IField)}>Delete</Button>}
                    </CardActions>
                </form>
            </Card>
        );
    }
}

export default (EditFieldForm)
