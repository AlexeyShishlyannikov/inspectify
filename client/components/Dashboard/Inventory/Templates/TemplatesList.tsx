import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SelectIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteProps } from 'react-router-dom';

import { ITemplate } from '../../../../models/inventory';
import { ApplicationState } from '../../../../store';
import { ISelectTemplateAction } from '../../../../store/templates/templateActions';
import './TemplatesList.scss';
import Button from '@material-ui/core/Button';
import { CardActions } from '@material-ui/core';

interface ITemplatesListProps {
    templates: ITemplate[];
    selectedtemplate?: ITemplate;
    isLoading: boolean;
    errorMessage?: string;
    selectTemplate: (template: ITemplate) => void;
}

class TemplatesList extends React.Component<ITemplatesListProps & RouteProps> {
    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress />;
        } else if (this.props.templates.length === 0) {
            Content = () => <CardContent><div>No templates found.</div></CardContent>;
        } else {
            Content = () => <List>
                {this.props.templates.map(template => (
                    <Link style={{textDecoration: 'none'}} key={template.id} to={'/dashboard/inventory/templates/view/' + template.id}>
                        <ListItem dense button onClick={() => this.props.selectTemplate(template)}>
                            <ListItemText
                                primary={<Typography variant="title">{template.name}</Typography>}
                                secondary={template.description && <span>Description: {template.description}</span>}
                            />
                            <ListItemSecondaryAction>
                                <SelectIcon />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                ))}
            </List>;
        }
        return (
            <Card style={{ marginTop: '15px' }}>
                <CardHeader title="Templates" />
                <Content />
                <CardActions className="templates-card-actions">
                    <Link to="/dashboard/inventory/templates/create" className="templates-new-template-link">
                        <Button type="submit" color="primary" variant='text'>
                            Create new template
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

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
        selectTemplate: (template: ITemplate) => {
            const action: ISelectTemplateAction = {
                type: "SELECT_TEMPLATE_ACTION",
                selectedTemplate: template
            };
            return dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesList)
