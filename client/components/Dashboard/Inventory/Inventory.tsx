import './Inventory.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { ITemplate } from '../../../models/inventory';
import { ApplicationState } from '../../../store';
import TemplatesList from './Templates/TemplatesList';
import { TemplatesThunks } from '../../../store/templates/templateThunks';
import ItemList from './Items/ItemList';
import { ItemsThunks } from '../../../store/items/itemsThunks';
import { ISelectTemplateAction } from 'client/store/templates/templateActions';

interface IInventoryProps {
    selectedTemplate?: ITemplate;
    templates: ITemplate[];
    isLoading: boolean;
    errorMessage?: string;
    deselectTemplate: () => void;
    searchTemplates: (searchTerm?: string) => void;
    searchItems: (searchTerm?: string) => void;
}

class Inventory extends React.Component<IInventoryProps> {
    componentWillMount() {
        this.props.deselectTemplate();
        this.props.searchTemplates();
        this.props.searchItems();
    }

    render() {
        return (
            <div className="dashboard-inventory">
                <ItemList />
                <TemplatesList />
            </div>
        )
    }
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedTemplate: state.templates.selectedTemplate,
        templates: state.templates.templates,
        isLoading: state.templates.isLoading,
        errorMessage: state.templates.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deselectTemplate: () => {
            const action: ISelectTemplateAction = {
                type: "SELECT_TEMPLATE_ACTION",
                selectedTemplate: undefined
            }
            return dispatch(action);
        },
        searchTemplates: (searchTerm?: string) => dispatch(TemplatesThunks.searchTemplates(searchTerm)),
        searchItems: (searchTerm?: string) => dispatch(ItemsThunks.searchItems(searchTerm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
