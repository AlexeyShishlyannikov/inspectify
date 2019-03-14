import './Inventory.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { ITemplate } from '../../../models/inventory';
import { ApplicationState } from '../../../store';
import TemplatesList from './Templates/TemplatesList';
import { TemplatesThunks } from '../../../store/templates/templateThunks';
import ItemList from './Items/ItemList';
import { ItemsThunks } from '../../../store/items/itemsThunks';

interface IInventoryProps {
    selectedTemplate?: ITemplate;
    templates: ITemplate[];
    isLoading: boolean;
    errorMessage?: string;
    searchTemplates: (searchTerm: string) => void;
    searchItems: (searchTerm: string) => void;
}

class Inventory extends React.Component<IInventoryProps> {
    componentWillMount() {
        this.props.searchTemplates('');
        this.props.searchItems('');
    }

    render() {
        return (
            <div className="dashboard-Inventory">
                <TemplatesList />
                <ItemList />
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
        searchTemplates: (searchTerm: string) => dispatch(TemplatesThunks.searchTemplates(searchTerm)),
        searchItems: (searchTerm: string) => dispatch(ItemsThunks.searchItems(searchTerm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
