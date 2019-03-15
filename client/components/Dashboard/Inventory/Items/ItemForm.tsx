import './ItemForm.scss';

import { CardActions, FormHelperText, Select, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { ISelectTemplateAction } from '../../../../store/templates/templateActions';
import { TemplatesThunks } from '../../../../store/templates/templateThunks';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, RouteProps, Redirect } from 'react-router-dom';

import { IItem, IItemValue, ITemplate, IProperty, PropertyType } from '../../../../models/inventory';
import { ApplicationState } from '../../../../store';
import { ISelectItemAction } from '../../../../store/items/itemsActions';
import { ItemsThunks } from '../../../../store/items/itemsThunks';

interface IItemFormProps {
    isEditMode: boolean;

    selectedTemplate?: ITemplate;
    templates: ITemplate[];
    properties: IProperty[];
    selectTemplate: (template?: ITemplate) => void;
    searchTemplates: (searchTerm: string) => void;

    selectedItem?: IItem;
    isLoading: boolean;
    errorMessage?: string;

    deselectItem: () => void;
    getItem: (id: string) => void;
    addItem: (Item: IItem) => void;
    updateItem: (Item: IItem) => void;
    onSave?: () => void;
}

interface IItemFormState {
    name: string;
    values: IItemValue[];
}

class ItemForm extends React.Component<IItemFormProps & RouteComponentProps & RouteProps, IItemFormState> {
    componentWillMount() {
        if (this.props.isEditMode) {
            const id: string = this.props.match.params['id'];
            this.props.getItem(id);
        } else {
            this.props.deselectItem();
        }
        this.setState({
            name: this.props.isEditMode && this.props.selectedItem ? this.props.selectedItem.name : '',
            values: this.props.selectedItem ? this.props.selectedItem.values : []
        });
        this.props.searchTemplates(''); // replace with search
    }

    componentWillReceiveProps(newProps: IItemFormProps) {
        if (newProps.selectedItem && newProps.selectedItem !== this.props.selectedItem && newProps.isEditMode) {
            this.setState({
                name: newProps.selectedItem.name,
                values: newProps.selectedItem.values
            });
        }
    }

    createItem = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.selectedTemplate && this.props.addItem({
            name: this.state.name,
            template: this.props.selectedTemplate,
            values: this.state.values
        });
    };

    updateItem = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.selectedItem && this.props.selectedTemplate) {
            this.props.updateItem({
                id: this.props.selectedItem.id,
                name: this.state.name,
                template: this.props.selectedTemplate,
                values: this.state.values
            });
        }
    };

    onItemFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.isEditMode) {
            this.updateItem(event);
        } else {
            this.createItem(event);
        }
        if (this.props.onSave) {
            this.props.onSave();
        }
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

    handleFieldChange = (property: IProperty, itemValue?: IItemValue) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const value = event.target.value;
        if (itemValue) {
            itemValue.value = value;
            const newValuesArray = this.state.values.map(v => v.id === (itemValue as IItemValue).id ? itemValue as IItemValue : v);
            this.setState({
                values: newValuesArray
            });
        } else {
            itemValue = {
                property: property,
                value: value
            }
            this.setState({
                values: this.state.values.concat(itemValue)
            });
        }
    };

    isButtonDisabled = () => !this.state.name && !this.props.selectedTemplate || this.props.isLoading;

    render() {
        if (this.props.selectedItem && !this.props.isEditMode) {
            return <Redirect to={'./edit/' + this.props.selectedItem.id} />
        }
        return (
            <div className="Item-view-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <form className="Item-view" onSubmit={this.onItemFormSubmit}>
                    <Card>
                        <CardHeader
                            title={(this.props.isEditMode ? 'Edit' : 'Create') + ' Item'}
                            action={this.props.isEditMode && this.props.selectedItem && <Link to={'../view/' + this.props.selectedItem.id}><Button variant="text">View</Button></Link>} />
                        <CardContent className="item-view-content">
                            <FormControl required className="item-view-input">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                />
                            </FormControl>
                            <FormControl required className="input-field-preview">
                                <InputLabel htmlFor="name">Template</InputLabel>
                                <Select
                                    native
                                    value={this.props.selectedTemplate ? this.props.selectedTemplate.id : ""}
                                    onChange={(event) => this.props.selectTemplate(this.props.templates.find(t => t.id === event.target.value))}
                                >
                                    <option value="" />
                                    {this.props.templates.map(template =>
                                        <option key={template.id} value={template.id}>{template.name}</option>)}
                                </Select>
                                <FormHelperText>Select template to create an item</FormHelperText>
                            </FormControl>
                            {this.props.selectedTemplate && this.props.properties.length > 0 && <Typography variant="h6">Properties</Typography>}
                            {this.props.selectedTemplate && this.props.properties.map(property => {
                                const itemValueRef = this.state.values.find(v => v.property.id === property.id);
                                return <FormControl key={property.id} className="item-view-input">
                                    <InputLabel htmlFor={property.name}>{property.name}</InputLabel>
                                    <Input
                                        type={property.type === PropertyType.String ? 'text' : 'number'} // implement getter
                                        value={itemValueRef ? itemValueRef.value : undefined}
                                        onChange={this.handleFieldChange(property, itemValueRef)}
                                    />
                                </FormControl>
                            })}
                        </CardContent>
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={this.isButtonDisabled()}
                                variant={this.isButtonDisabled() ? 'text' : 'contained'}
                            >
                                {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Save Item'}
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedItem: state.items.selectedItem,
        isLoading: state.items.isLoading,
        errorMessage: state.items.errorMessage,

        selectedTemplate: state.templates.selectedTemplate,
        properties: state.templates.properties,
        templates: state.templates.templates,
        isTemplatesLoading: state.templates.isLoading,
        templatesErrorMessage: state.templates.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deselectItem: () => {
            const action: ISelectItemAction = {
                type: "SELECT_ITEM_ACTION",
                selectedItem: undefined
            }
            return dispatch(action);
        },
        getItem: (id: string) => dispatch(ItemsThunks.getItem(id)),
        addItem: (Item: IItem) => dispatch(ItemsThunks.createItem(Item)),
        updateItem: (Item: IItem) => dispatch(ItemsThunks.updateItem(Item)),
        searchTemplates: (searchTerm: string) => dispatch(TemplatesThunks.searchTemplates(searchTerm)),
        selectTemplate: (template?: ITemplate) => {
            const action: ISelectTemplateAction = {
                type: "SELECT_TEMPLATE_ACTION",
                selectedTemplate: template
            }
            return dispatch(action);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm)
