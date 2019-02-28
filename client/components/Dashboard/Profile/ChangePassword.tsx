import './ChangePassword.scss';

import { CardActions, CardContent, CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { ApplicationState } from '../../../store';
import { IChangePasswordAction } from '../../../store/authentication/authenticationActions';
import * as React from 'react';
import { connect } from 'react-redux';

import { AuthThunks } from '../../../store/authentication/authenticationThunks';

interface IChangePasswordState {
    password: string;
    oldPassword: string;
}

interface IChangePasswordProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage?: string;
    changePassword: (changePasswordModel: IChangePasswordAction) => void;
}

class ChangePassword extends React.Component<IChangePasswordProps, IChangePasswordState> {
    state: IChangePasswordState = {
        password: '',
        oldPassword: ''
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

    callChangePasswordApi = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        this.props.changePassword({
            type: "CHANGE_PASSWORD_ACTION",
            password: this.state.password,
            oldPassword: this.state.oldPassword
        });
    };

    isButtonDisabled = () => !this.state.oldPassword || !this.state.password;

    getSubmitButton = () => {
        return <Button
            disabled={this.isButtonDisabled()}
            type="submit"
            variant={this.isButtonDisabled() ? "text" : "contained"}
            color="secondary"
        >
            {this.props.isLoading ? <CircularProgress size={30} color='secondary' /> : 'Change Password'}
        </Button>
    }

    render(): JSX.Element {
        return (
            <Card className="">
                <form onSubmit={this.callChangePasswordApi} className="">
                    <CardHeader title="Change Password" />
                    <CardContent className="change-password-content">
                        <FormControl className="change-password-input">
                            <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
                            <Input
                                type={'password'}
                                value={this.state.oldPassword}
                                onChange={this.handleChange('oldPassword')}
                            />
                        </FormControl>
                        <FormControl className="change-password-input">
                            <InputLabel htmlFor="password">New Password</InputLabel>
                            <Input
                                type={'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
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
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoading: state.authentication.isLoading,
        isAuthenticated: state.authentication.isAuthenticated,
        errorMessage: state.authentication.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (changePasswordModel: IChangePasswordAction) => {
            dispatch(AuthThunks.changePassword({
                type: "CHANGE_PASSWORD_ACTION",
                oldPassword: changePasswordModel.oldPassword,
                password: changePasswordModel.password
            }))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
