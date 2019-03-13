import './TemplateView.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { uniqBy } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';

import { PropertyType, ITemplate } from '../../../models/inventory';
import { ApplicationState } from '../../../store';
import { TemplatesThunks } from '../../../store/templates/TemplateThunks';

 interface ITemplateViewProps {
    selectedTemplate?: ITemplate;
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
                            <Link to={'../edit/' + this.props.selectedTemplate.id} style={{ textDecoration: 'none' }}>
                                <Button color="secondary" variant="text">
                                    Edit <EditIcon />
                                </Button>
                            </Link>
                        }
                        subheader={<Typography variant="subheading">{this.props.selectedTemplate.description}</Typography>}
                    />
                    <CardContent className="template-view-content">
                        <div>Statistics</div>
                        <div>Properties: {this.props.selectedTemplate.properties.length}</div>
                    </CardContent>
                </Card>
                <br />
                <Card>
                    <CardHeader title='Fields' />
                    <CardContent className="template-view-content">
                    </CardContent>
                </Card>
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
        deleteTemplate: (id: string) => dispatch(TemplatesThunks.deleteTemplate(id)),
        // getPeopleForTemplate: (TemplateId: string) => dispatch(PeopleThunks.getPeopleForTemplate(TemplateId, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateView);
