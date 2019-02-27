import './ProfileForm.scss';

import { Avatar, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { User } from '../../../models/Authentication';
import { ICompany } from '../../../models/company';
import { ApplicationState } from '../../../store';
import { ILogoutAction } from '../../../store/authentication/authenticationActions';
import { CompanyThunks } from '../../../store/company/companyThunks';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

interface IProfileCompanyFormProps {
    user?: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage?: string;
    company?: ICompany;
    isCompanyLoading: boolean;
    logout: () => void;
    getCompany: () => void;
    updateCompany: (company: ICompany) => void;
}

interface IProfileCompanyFormState {
    email: string;
    name: string;
    photo?: string;
}

class ProfileUserForm extends React.Component<IProfileCompanyFormProps, IProfileCompanyFormState> {
    state: IProfileCompanyFormState = {
        email: this.props.user ? this.props.user.email : '',
        name: this.props.company ? this.props.company.name : '',
        photo: this.props.company ? this.props.company.logoUri : ''
    };

    componentWillMount() {
        this.props.getCompany();
    }

    updateCompany = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        this.props.updateCompany({
            id: this.props.company ? this.props.company.id : '',
            name: this.state.name,
            logoUri: ''
        });
    };

    handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    isButtonDisabled = () => !this.state.email || !this.state.name;

    getSubmitButton = () => {
        return <Button
            disabled={this.isButtonDisabled()}
            type="submit"
            className=""
            variant={this.isButtonDisabled() ? 'text' : 'contained'}
            color="primary"
        >
            {this.props.isLoading ? <CircularProgress size={30} /> : 'Save'}
        </Button>;
    };

    render() {
        if (!this.props.isAuthenticated) return <Redirect to="/login" />
        return (
            <Card className="profile-form-card">
                <form className="profile-form" onSubmit={this.updateCompany}>
                    <CardHeader
                        title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar style={{ transform: 'scale(0.75)' }} src={this.props.company ? this.props.company.logoUri : ''}>
                                    {this.props.company ?
                                        (this.props.company.logoUri ?
                                            null
                                            : this.props.company.name.substring(0, 2).toUpperCase())
                                        : null}
                                </Avatar>
                                <div>Company</div>
                            </div>
                        }
                        action={
                            <Button onClick={this.props.logout} variant="text" color="secondary">
                                Logout
                            </Button>
                        }
                    />
                    <CardContent className="profile-form-content">
                        <FormControl className="profile-form-input">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                            />
                        </FormControl>
                        <FormControl className="profile-form-input">
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                            />
                        </FormControl>
                        <FormControl className="profile-form-input">
                            <InputLabel htmlFor="photo">Photo</InputLabel>
                            <Input
                                type="text"
                                value={this.state.photo}
                                onChange={this.handleChange('photo')}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        {this.getSubmitButton()}
                        {!this.props.errorMessage ? null : <div style={{ 'color': 'red' }}> {this.props.errorMessage} </div>}
                    </CardActions>
                </form>
            </Card>
        );
    }
};

const mapStateToProps = (state: ApplicationState) => ({
    user: state.authentication.user,
    isLoading: state.authentication.isLoading,
    errorMessage: state.authentication.errorMessage,
    isAuthenticated: state.authentication.isAuthenticated,
    company: state.company.company,
    isCompanyLoading: state.company.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        const action: ILogoutAction = {
            type: "LOGOUT_ACTION"
        };
        dispatch(action);
    },
    getCompany: () => dispatch(CompanyThunks.getCompany()),
    updateCompany: (company: ICompany) => dispatch(CompanyThunks.updateCompany(company))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserForm);
