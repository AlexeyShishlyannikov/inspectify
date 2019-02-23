import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { StyleRulesCallback, withStyles, StyledComponentProps } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthThunks } from '../../store/authentication/authenticationThunks';
import { ILoginAction } from '../../store/authentication/authenticationActions';
import { connect } from 'react-redux';
import { ApplicationState } from 'client/store';

const styles: StyleRulesCallback = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
    },
    input: {
        margin: theme.spacing.unit
    },
    marginTop: {
        marginTop: '15px'
    },
    links: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'space-between'
    }
});

type ILoginState = ILoginAction & {
    showPassword: boolean;
}

interface ILoginProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: string;
    login: (loginModel: ILoginAction) => void;
}

class Login extends React.Component<ILoginProps & { classes }, ILoginState> {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.handleClickShowPassword.bind(this);
        this.callLoginApi.bind(this);
        this.getSubmitButton.bind(this)
    }

    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            type: 'LOGIN_ACTION',
            showPassword: false
        });
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

    callLoginApi = () => this.props.login(this.state);

    isButtonDisabled = () => {
        return !this.state.email || !this.state.password;
    };

    getSubmitButton = () => {
        return <Button
            disabled={this.isButtonDisabled()}
            onClick={this.callLoginApi}
            className={this.props.classes.marginTop}
            variant="contained"
            color="primary"
        >
            {this.props.isLoading ? <CircularProgress /> : 'Login'}
        </Button>
    }

    render(): JSX.Element {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.formContainer}>
                    <FormControl
                        className={classNames(
                            classes.margin,
                            classes.textField
                        )}
                    >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            type={this.state.showPassword ? 'text' : 'email'}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                        />
                    </FormControl>
                    <FormControl
                        className={classNames(
                            classes.margin,
                            classes.textField
                        )}
                    >
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
                                        {this.state.showPassword ? (
                                            <Visibility />
                                        ) : (
                                                <VisibilityOff />
                                            )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {this.getSubmitButton()}
                    {!this.props.errorMessage ? null : <div style={{ 'color': 'red' }}> {this.props.errorMessage} </div>}
                    <div className={classNames(classes.marginTop, classes.links)}>
                        <Link to="register">Register</Link>
                        <Link to="resetPassword">Forgot Password</Link>
                    </div>
                </div>
            </div>
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
        login: (loginModel: ILoginAction) => dispatch(AuthThunks.login(loginModel)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
