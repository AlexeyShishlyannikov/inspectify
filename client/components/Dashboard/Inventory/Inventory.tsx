import './Inventory.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { ITemplate } from '../../../models/inventory';
import { ApplicationState } from '../../../store';
import TemplatesList from './TemplatesList';
import { TemplatesThunks } from 'client/store/templates/templateThunks';

interface IInventoryProps {
    selectedTemplate?: ITemplate;
    templates: ITemplate[];
    isLoading: boolean;
    errorMessage?: string;
    searchTemplates: (searchTerm: string) => void;
}

class Inventory extends React.Component<IInventoryProps> {
    componentWillMount() {
        this.props.searchTemplates('');
    }

    render() {
        return (
            <div className="dashboard-Inventory">
                <TemplatesList />
            </div>
        )
    }
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedTemplate: state.templates.selectedTemplate,
        templates: state.templates.templates,
        isLoading: state.authentication.isLoading,
        errorMessage: state.authentication.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchTemplates: (searchTerm: string) => dispatch(TemplatesThunks.searchTemplates(searchTerm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
