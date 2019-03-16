import './FormView.scss';

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

import { FieldType, FormUtil, IForm } from '../../../models/form';
import { ApplicationState } from '../../../store';
import { FormThunks } from '../../../store/form/formThunks';
import { FieldPreviewBuilder } from './Fields/FieldPreviewBuilder';

 interface IFormViewProps {
    selectedForm?: IForm;
    isLoading: boolean;
    errorMessage?: string;
    getForm: (id: string) => void;
    deleteForm: (id: string) => void;
    // getPeopleForForm: (FormId: string) => void;
}

class FormView extends React.Component<IFormViewProps & RouteComponentProps & RouteProps> {
    componentWillMount() {
        const id: string = this.props.match.params['id'];
        this.props.getForm(id);
    }

    getFieldTypeStats = (type: FieldType) => {
        return <div> {FormUtil.getInputString(type)} Fields: {this.props.selectedForm && this.props.selectedForm.fields.filter(f => f.type === type).length} </div>
    }

    getAllFieldTypeStats = () => {
        return this.props.selectedForm && uniqBy(this.props.selectedForm.fields, f => f.type).map(field => <div key={field.type}> {this.getFieldTypeStats(field.type)}</div>);
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />
        }
        if (!this.props.selectedForm) {
            return <Redirect to=".." />
        }
        return (
            <div style={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
                <Card>
                    <CardHeader
                        title={this.props.selectedForm.name}
                        action={
                            <Link to={'../edit/' + this.props.selectedForm.id} style={{ textDecoration: 'none' }}>
                                <Button color="secondary" variant="text">
                                    Edit <EditIcon />
                                </Button>
                            </Link>
                        }
                        subheader={<Typography variant="subheading">{this.props.selectedForm.description}</Typography>}
                    />
                    <CardContent className="form-view-form-content">
                        <div>Statistics</div>
                        <div>Fields: {this.props.selectedForm.fields.length}</div>
                        <div>Group: N/A</div>
                        {this.getAllFieldTypeStats()}
                    </CardContent>
                </Card>
                <br />
                <Card>
                    <CardHeader title='Fields' />
                    <CardContent className="form-view-form-content">
                        {this.props.selectedForm.fields.map(field => <div key={field.id} style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <FieldPreviewBuilder field={field} />
                        </div>)}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedForm: state.forms.selectedForm,
        isLoading: state.forms.isLoading,
        errorMessage: state.forms.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getForm: (id: string) => dispatch(FormThunks.getForm(id)),
        deleteForm: (id: string) => dispatch(FormThunks.deleteForm(id)),
        // getPeopleForForm: (FormId: string) => dispatch(PeopleThunks.getPeopleForForm(FormId, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormView);
