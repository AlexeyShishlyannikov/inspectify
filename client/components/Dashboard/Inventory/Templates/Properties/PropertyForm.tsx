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
import CloseIcon from '@material-ui/icons/Close';
import { ApplicationState } from '../../../../../store';
import { TemplatesThunks } from '../../../../../store/templates/templateThunks';
import React = require('react');
import { connect } from 'react-redux';

import { getPropertyTypeString, IProperty, PropertyType } from '../../../../../models/inventory';

interface IPropertyFormProps {
    property?: IProperty;
    sortIndex: number;
    addProperty: (property: IProperty) => void;
    updateProperty: (property: IProperty) => void;
    deleteProperty: (id: number) => void;
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
        if (this.props.property && this.props.property.id) {
            this.props.updateProperty({
                id: this.props.property ? this.props.property.id : undefined,
                name: this.state.name,
                type: this.state.type,
                sortIndex: this.props.sortIndex
            });
        } else {
            this.props.addProperty({
                name: this.state.name,
                type: this.state.type,
                sortIndex: this.props.sortIndex
            });
        }
        if (this.props.onClose) this.props.onClose();
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
        return <option value={type}>{getPropertyTypeString(type)}</option>;
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
                            <InputLabel htmlFor="type">Type</InputLabel>
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
                        {this.props.property && this.props.property.id && <Button onClick={() => this.props.property && this.props.deleteProperty(this.props.property.id as number)}>Delete</Button>}
                    </CardActions>
                </form>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoading: state.templates.isPropertiesLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProperty: (property: IProperty) => dispatch(TemplatesThunks.createProperty(property)),
        updateProperty: (property: IProperty) => dispatch(TemplatesThunks.updateProperty(property)),
        deleteProperty: (id: number) => dispatch(TemplatesThunks.deleteProperty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyForm)
