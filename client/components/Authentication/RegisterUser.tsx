import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { IInvitation } from '../../models/invitation';
import { ApplicationState } from '../../store';
import { IRegisterUserAction } from '../../store/authentication/authenticationActions';
import { InvitationThunks } from '../../store/invitations/invitationsThunks';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, RouteProps } from 'react-router-dom';
import * as queryString from 'query-string';
import { AuthThunks } from '../../store/authentication/authenticationThunks';
import './Register.scss';

interface IRegisterUserProps {
    invitation?: IInvitation,
    isLoading: boolean,
    isAuthenticated: boolean,
    errorMessage?: string,
    registerUser: (registerModel: IRegisterUserAction) => void,
    getInvitation: (id: string) => void
}

interface IRegisterUserState {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
}

class RegisterUser extends React.Component<IRegisterUserProps & RouteProps, IRegisterUserState> {
    state: IRegisterUserState = {
        email: this.props.invitation ? this.props.invitation.email : '',
        firstName: this.props.invitation ? this.props.invitation.firstName : '',
        lastName: this.props.invitation ? this.props.invitation.lastName : '',
        password: '',
        confirmPassword: '',
        showPassword: false
    }

    componentWillMount() {
        const searchString: string = this.props.location ? this.props.location.search : '';
        const searchObject = queryString.parse(searchString);
        if (searchObject.invitationId) {
            this.props.getInvitation(searchObject.invitationId as string);
        }
    }

    componentWillReceiveProps(newProps: IRegisterUserProps) {
        if (newProps.invitation && this.props.invitation !== newProps.invitation) {
            this.setState(state => {
                if (newProps.invitation) {
                    return {
                        email: newProps.invitation.email,
                        firstName: newProps.invitation.firstName,
                        lastName: newProps.invitation.lastName,
                        password: state.password,
                        confirmPassword: state.confirmPassword,
                        showPassword: state.showPassword
                    }
                }
                return state;
            });
        }
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

    registerUser = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.invitation && this.props.invitation.id &&
            this.props.registerUser({
                type: "REGISTER_USER_ACTION",
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                invitationId: this.props.invitation.id,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            });
    }

    isButtonDisabled = () => {
        return (
            !this.state.email ||
            !this.state.firstName ||
            !this.state.lastName ||
            !this.state.password ||
            !this.state.confirmPassword ||
            !this.props.invitation
        );
    };

    render(): JSX.Element {
        if (this.props.isAuthenticated) return <Redirect to='/dashboard' />;
        return (
            <form onSubmit={this.registerUser} className="register-form">
                <FormControl className="register-input">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        type='email'
                        disabled={true}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                </FormControl>
                <FormControl className="register-input">
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                        type='text'
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                    />
                </FormControl>
                <FormControl className="register-input">
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                        type='text'
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                    />
                </FormControl>
                <FormControl className="register-input">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}>
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className="register-input">
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <Input
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}>
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    className="register-input"
                    disabled={this.isButtonDisabled()}
                    variant="contained"
                    color="primary"
                    type="submit">
                    {this.props.isLoading ? <CircularProgress size={30} color='secondary' /> : 'Register'}
                </Button>
                <div className="register-links">
                    {<div style={{ 'color': 'red' }}> {!this.props.errorMessage ? null : this.props.errorMessage} </div>}
                    <Link to="login"> Sign in </Link>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        invitation: state.invitations.selectedInvitation,
        isLoading: state.authentication.isLoading,
        isAuthenticated: state.authentication.isAuthenticated,
        errorMessage: state.authentication.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (registerModel: IRegisterUserAction) => dispatch(AuthThunks.registerUser(registerModel)),
        getInvitation: (id: string) => dispatch(InvitationThunks.getInvitation(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
