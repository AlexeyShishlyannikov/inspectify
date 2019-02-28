import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AuthThunks } from '../../store/authentication/authenticationThunks';
import { connect } from 'react-redux';
import { ApplicationState } from 'client/store';
import { IRegisterCompanyAction } from 'client/store/authentication/authenticationActions';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IRegisterCompanyProps {
    isLoading: boolean,
    isAuthenticated: boolean,
    errorMessage?: string,
    registerCompany: (registerModel: IRegisterCompanyAction) => void,
}

interface IRegisterCompanyState {
    email: string;
    companyName: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
}

class RegisterCompany extends React.Component<IRegisterCompanyProps, IRegisterCompanyState> {
    state: IRegisterCompanyState = {
        email: '',
        companyName: '',
        password: '',
        confirmPassword: '',
        showPassword: false
    }

    handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    handleClickShowPassword = (): void => {
        this.setState(state => ({
            ...state,
            showPassword: !state.showPassword
        }));
    };

    registerCompany = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.registerCompany({
            type: "REGISTER_COMPANY_ACTION",
            email: this.state.email,
            companyName: this.state.companyName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        });
    }

    isButtonDisabled = () => {
        return (
            !this.state.email ||
            !this.state.companyName ||
            !this.state.password ||
            !this.state.confirmPassword
        );
    };

    render(): JSX.Element {
        if (this.props.isAuthenticated) return <Redirect to='/dashboard' />;
        return (
            <form onSubmit={this.registerCompany} >
                <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        type='email'
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="companyName">Company Name</InputLabel>
                    <Input
                        type='text'
                        value={this.state.companyName}
                        onChange={this.handleChange('companyName')}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <Input
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    disabled={this.isButtonDisabled()}
                    variant="contained"
                    color="primary"
                    type="submit">
                    {this.props.isLoading ? <CircularProgress size={30} color='secondary' /> : 'Register'}
                </Button>
                {!this.props.errorMessage ? null : <div style={{ 'color': 'red' }}> {this.props.errorMessage} </div>}
                <Link to="login"> Sign in </Link>
            </form>
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
        registerCompany: (registerModel: IRegisterCompanyAction) => {
            const registerCompany: IRegisterCompanyAction = {
                type: "REGISTER_COMPANY_ACTION",
                email: registerModel.email,
                companyName: registerModel.companyName,
                password: registerModel.password,
                confirmPassword: registerModel.confirmPassword
            };
            dispatch(AuthThunks.registerCompany(registerCompany));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCompany);
