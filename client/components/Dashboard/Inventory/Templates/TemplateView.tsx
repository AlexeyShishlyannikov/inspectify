import './TemplateView.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';

import { IProperty, ITemplate } from '../../../../models/inventory';
import { ApplicationState } from '../../../../store';
import { TemplatesThunks } from '../../../../store/templates/templateThunks';
import Property from './Properties/Property';

interface ITemplateViewProps {
    selectedTemplate?: ITemplate;
    properties: IProperty[];
    isLoading: boolean;
    errorMessage?: string;
    getTemplate: (id: string) => void;
    deleteTemplate: (id: string) => void;
    // getPeopleForTemplate: (TemplateId: string) => void;
}

class TemplateView extends React.Component<ITemplateViewProps & RouteComponentProps & RouteProps> {
    componentWillMount() {
        const id: string = this.props.match.params['id'];
        this.props.getTemplate(id);
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />
        }
        if (!this.props.selectedTemplate) {
            return <Redirect to=".." />
        }
        return (
            <div style={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
                <Card>
                    <CardHeader
                        title={this.props.selectedTemplate.name}
                        action={
                            <div>
                                <Link to={'../edit/' + this.props.selectedTemplate.id} style={{ textDecoration: 'none' }}>
                                    <Button color="primary" variant="text">
                                        Edit <EditIcon />
                                    </Button>
                                </Link>
                                <Button color="secondary" onClick={() => this.props.selectedTemplate && this.props.deleteTemplate(this.props.selectedTemplate.id as string)} variant="outlined">Delete</Button> {/** move to edit view */}
                            </div>
                        }
                        subheader={<Typography color="textSecondary" variant="subheading">{this.props.selectedTemplate.description}</Typography>}
                    />
                </Card>
                <br />
                {this.props.properties.length > 0 && <CardHeader title='Properties' />}
                {this.props.properties.map(property => {
                    return <div key={property.id} className="template-view-panel"><Property property={property} /></div>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedTemplate: state.templates.selectedTemplate,
        properties: state.templates.properties,
        isLoading: state.templates.isLoading,
        errorMessage: state.templates.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTemplate: (id: string) => dispatch(TemplatesThunks.getTemplate(id)),
        deleteTemplate: (id: string) => dispatch(TemplatesThunks.deleteTemplate(id)),
        // getPeopleForTemplate: (TemplateId: string) => dispatch(PeopleThunks.getPeopleForTemplate(TemplateId, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateView);
