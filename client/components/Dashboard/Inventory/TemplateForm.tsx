import './TemplateForm.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, RouteProps } from 'react-router-dom';

import { IProperty, ITemplate } from '../../../models/inventory';
import { ApplicationState } from '../../../store';
import { TemplatesThunks } from '../../../store/templates/templateThunks';
import Property from './Properties/Property';
import PropertyForm from './Properties/PropertyForm';

// import EditFieldTemplate from './properties/EditFieldTemplate';
// import FieldPreview from './properties/FieldPreview';

interface ITemplateFormProps {
    isEditMode: boolean;

    selectedTemplate?: ITemplate;
    isLoading: boolean;
    errorMessage?: string;
    getTemplate: (id: string) => void;
    addTemplate: (Template: ITemplate) => void;
    updateTemplate: (Template: ITemplate) => void;
    onSave?: () => void;
}

interface ITemplateFormState {
    name: string;
    description: string;
    isAdding: boolean;
    properties: IProperty[];
    propertyEditingMap: { [id: string]: boolean }
}

class TemplateForm extends React.Component<ITemplateFormProps & RouteComponentProps & RouteProps, ITemplateFormState> {
    componentWillMount() {
        if (this.props.isEditMode) {
            const id: string = this.props.match.params['id'];
            this.props.getTemplate(id);
        }
        this.setState({
            name: this.props.isEditMode && this.props.selectedTemplate ? this.props.selectedTemplate.name : '',
            description: this.props.isEditMode && this.props.selectedTemplate && this.props.selectedTemplate.description ? this.props.selectedTemplate.description : '',
            properties: this.props.isEditMode && this.props.selectedTemplate ? this.props.selectedTemplate.properties : [],
            isAdding: false,
            propertyEditingMap: {}
        });
    }

    componentWillReceiveProps(newProps: ITemplateFormProps) {
        if (newProps.selectedTemplate && newProps.selectedTemplate !== this.props.selectedTemplate && newProps.isEditMode) {
            this.setState({
                name: newProps.selectedTemplate.name,
                description: newProps.selectedTemplate.description,
                properties: newProps.selectedTemplate ? newProps.selectedTemplate.properties : [],
                isAdding: false,
                propertyEditingMap: {}
            });
        }
    }

    createTemplate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.addTemplate({
            name: this.state.name,
            description: this.state.description,
            properties: this.state.properties
        });
    };

    updateTemplate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.selectedTemplate) {
            this.props.updateTemplate({
                id: this.props.selectedTemplate.id,
                name: this.state.name,
                description: this.state.description,
                properties: this.state.properties
            });
        }
    };

    updateEditingState = (id: number, isEditing: boolean) => {
        this.setState(state => {
            const newEditingState = {
                ...state.propertyEditingMap,
                [id]: isEditing
            };
            return {
                propertyEditingMap: newEditingState
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

    addProperty = () => {
        this.setState({
            isAdding: true
        });
    }

    onpropertiesave = (property: IProperty) => {
        this.setState({
            properties: property.id
                ? this.adjustSortIndexes(this.state.properties.map(savedproperty => savedproperty.id === property.id ? property : savedproperty))
                : this.state.properties.concat({ ...property, sortIndex: this.state.properties.length + 1 }),
            isAdding: false
        });
        if (property.id) {
            this.updateEditingState(property.id, false);
        }
    }

    isButtonDisabled = () => !this.state.name || this.state.properties.length === 0 || this.props.isLoading;

    adjustSortIndexes = (properties: IProperty[]) => {
        return properties.sort((f1, f2) => f1.sortIndex - f2.sortIndex).map((field, index) => ({
            ...field,
            sortIndex: index + 1
        }));
    }

    render() {
        return (
            <div className="template-view-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <form className="template-view" onSubmit={(event) => {
                    event.preventDefault();
                    if (this.props.isEditMode) {
                        this.updateTemplate(event);
                    } else {
                        this.createTemplate(event);
                    }
                    if (this.props.onSave) {
                        this.props.onSave();
                    }
                }}>
                    <Card>
                        <CardHeader title={(this.props.isEditMode ? 'Edit' : 'Create') + ' Template'} />
                        <CardContent className="template-view-content">
                            <FormControl className="template-view-input">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                />
                            </FormControl>
                            <FormControl className="template-view-input">
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
                    {this.state.properties.length > 0 && <CardHeader title="properties" />}
                    {this.state.properties.map(property => {
                        if (this.state.propertyEditingMap[property.id as number]) {
                            return <div key={property.id} className="template-view-panel">
                                <PropertyForm
                                    property={property}
                                    onClose={() => this.updateEditingState(property.id as number, false)}
                                    onSave={this.onpropertiesave}
                                    onDelete={(deletedProperty: IProperty) => this.setState({
                                        properties: this.adjustSortIndexes(this.state.properties.filter(stateProperty => stateProperty.id !== deletedProperty.id))
                                    })}
                                />
                            </div>
                        }
                        return <div key={property.id} className="template-view-panel"><Property property={property} onEditClick={() => this.updateEditingState(property.id as number, true)} /></div>
                    })}
                    {this.state.isAdding &&
                        <div className="template-view-panel">
                            <PropertyForm onClose={() => this.setState({ isAdding: false })} onSave={this.onpropertiesave} />
                        </div>}
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                        {!this.state.isAdding && <Button color="primary" variant='contained' onClick={this.addProperty}> Add property</Button>}
                        <br />
                        <Button
                            type="submit"
                            color="primary"
                            disabled={this.isButtonDisabled()}
                            variant={this.isButtonDisabled() ? 'text' : 'contained'}
                        >
                            {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Save Template'}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedTemplate: state.templates.selectedTemplate,
        isLoading: state.templates.isLoading,
        errorMessage: state.templates.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTemplate: (id: string) => dispatch(TemplatesThunks.getTemplate(id)),
        addTemplate: (Template: ITemplate) => dispatch(TemplatesThunks.createTemplate(Template)),
        updateTemplate: (Template: ITemplate) => dispatch(TemplatesThunks.updateTemplate(Template))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm)
