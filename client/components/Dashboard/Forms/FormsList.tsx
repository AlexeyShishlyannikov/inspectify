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

import { IForm } from '../../../models/Form';
import { ApplicationState } from '../../../store';
import { ISelectFormAction } from '../../../store/Form/FormActions';
import './FormsList.scss';
import Button from '@material-ui/core/Button';
import { CardActions } from '@material-ui/core';

interface IFormsListProps {
    forms: IForm[];
    selectedForm?: IForm;
    isLoading: boolean;
    errorMessage?: string;
    selectForm: (Form: IForm) => void;
}

class FormsList extends React.Component<IFormsListProps & RouteProps> {
    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress />;
        } else if (this.props.forms.length === 0) {
            Content = () => <CardContent><div>No Forms found.</div></CardContent>;
        } else {
            Content = () => <List>
                {this.props.forms.map(form => (
                    <ListItem key={form.id} dense>
                        <ListItemText
                            primary={<Typography variant="title">{form.name}</Typography>}
                            secondary={form.description && <span>Description: {form.description}</span>}
                        />
                        <ListItemSecondaryAction>
                            <Link to={'/dashboard/forms/view/' + form.id}>
                                <IconButton aria-label="select" color="primary" onClick={() => this.props.selectForm(form)}>
                                    <SelectIcon />
                                </IconButton>
                            </Link>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>;
        }
        return (
            <Card style={{ marginTop: '15px' }}>
                <CardHeader title="Forms" />
                <Content />
                <CardActions className="forms-card-actions">
                    <Link to="/dashboard/forms/create" className="forms-new-form-link">
                        <Button type="submit" color="primary" variant='text'>
                            Create new form
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedForm: state.forms.selectedForm,
        forms: state.forms.forms,
        isLoading: state.forms.isLoading,
        errorMessage: state.forms.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectForm: (Form: IForm) => {
            const action: ISelectFormAction = {
                type: "SELECT_FORM_ACTION",
                selectedForm: Form
            };
            return dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsList)
