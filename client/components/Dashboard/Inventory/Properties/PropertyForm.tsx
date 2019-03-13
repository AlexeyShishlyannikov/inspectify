import './PropertyForm.scss';

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

import { IProperty, PropertyType } from '../../../../models/inventory';

interface IPropertyFormProps {
    property?: IProperty;
    onSave?: (property: IProperty) => void;
    onDelete?: (property: IProperty) => void;
    onClose?: () => void;
}

interface IPropertyFormState {
    name: string;
    type: PropertyType;
}

class PropertyForm extends React.Component<IPropertyFormProps, IPropertyFormState> {
    componentWillMount() {
        this.setState({
            name: this.props.property ? this.props.property.name : '',
            type: this.props.property && this.props.property.type ? this.props.property.type : PropertyType.String
        });
    }

    saveProperty = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.props.onSave) {
            this.props.onSave({
                id: this.props.property ? this.props.property.id : undefined,
                name: this.state.name,
                type: this.state.type,
                sortIndex: this.props.property ? this.props.property.sortIndex : 9999
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

    getTypeSelectionOption = (type: PropertyType) => {
        return <option value={type}>type</option>;
    }

    render() {
        return (
            <Card>
                <form className="form-view-form" onSubmit={event => this.saveProperty(event)}>
                    <CardHeader
                        title={(!this.props.property ? 'Add' : 'Edit') + ' Property'}
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
                            <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                            <Select
                                native
                                value={this.state.type}
                                onChange={this.handleTypeSelection('type')}
                            >
                                {this.getTypeSelectionOption(PropertyType.String)}
                                {this.getTypeSelectionOption(PropertyType.Number)}
                                {this.getTypeSelectionOption(PropertyType.Photo)}
                            </Select>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        {this.getSubmitButton()}
                        {this.props.property && this.props.onDelete && <Button onClick={() => this.props.onDelete && this.props.onDelete(this.props.property as IProperty)}>Delete</Button>}
                    </CardActions>
                </form>
            </Card>
        );
    }
}

export default (PropertyForm)
