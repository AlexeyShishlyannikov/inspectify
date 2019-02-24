import './ProfileUserForm.scss';

import { CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { User } from 'client/models/Authentication';
import { ApplicationState } from 'client/store';
import { ILogoutAction } from 'client/store/authentication/authenticationActions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

interface IProfileUserFormProps {
    user?: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage?: string;
    logout: () => void;
}

interface IProfileUserFormState {
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: number;
}

class ProfileUserForm extends React.Component<IProfileUserFormProps, IProfileUserFormState> {
    state = {
        email: this.props.user ? this.props.user.email : '',
        firstName: '',
        lastName: '',
        phoneNumber: undefined
    };

    updateUser = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        // this.props.logout();
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

    isButtonDisabled = () => !this.state.email || !this.state.firstName || !this.state.lastName || !this.state.phoneNumber;

    getSubmitButton = () => {
        return <Button
            disabled={this.isButtonDisabled()}
            type="submit"
            className=""
            variant={this.isButtonDisabled() ? 'text' : 'contained'}
            color="primary"
        >
            {this.props.isLoading ? <CircularProgress size={30} /> : 'Save'}
        </Button>
    };

    openChangePasswordDialog = () => { };

    render() {
        if (!this.props.isAuthenticated) return <Redirect to="/login" />
        return (
            <Card className="profile-form-card">
                <form className="profile-form" onSubmit={this.updateUser}>
                    <CardHeader
                        title={'Profile'}
                        action={
                            <Button onClick={this.props.logout} variant="text" color="secondary">
                                Logout
                        </Button>
                        } />
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
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                            />
                        </FormControl>
                        <FormControl className="profile-form-input">
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                            />
                        </FormControl>
                        <FormControl className="profile-form-input">
                            <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                            <Input
                                type="number"
                                value={this.state.phoneNumber}
                                onChange={this.handleChange('phoneNumber')}
                            />
                        </FormControl>
                        <Button
                            className="profile-form-input"
                            onClick={this.openChangePasswordDialog}
                            variant="contained"
                            color="secondary">
                            Change Password
                        </Button>
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
    isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        const action: ILogoutAction = {
            type: "LOGOUT_ACTION"
        };
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserForm);
