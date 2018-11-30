import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ILogin } from './models/AccontModels';

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

interface ILoginState extends ILogin {
    showPassword: boolean;
}

class Login extends React.Component<any, ILoginState> {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.handleClickShowPassword.bind(this);
        this.callLoginApi.bind(this);
    }

    componentWillMount() {
        this.setState({
            userName: '',
            password: '',
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

    callLoginApi = () => {
        fetch(window.location.origin + '/api/account/login/user', {
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            }),
            method: 'POST',
            cache: 'default',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((response: string) => {
                localStorage.setItem('authToken', response);
                console.log(response);
            })
            .catch(res => console.log(res));
    };

    isButtonDisabled = () => !this.state.userName || !this.state.password;

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
                            value={this.state.userName}
                            onChange={this.handleChange('userName')}
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
                    <Button
                        disabled={this.isButtonDisabled()}
                        onClick={this.callLoginApi}
                        className={classes.marginTop}
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                    <div
                        className={classNames(classes.marginTop, classes.links)}
                    >
                        <Link to="register">Register</Link>
                        <Link to="resetPassword">Forgot Password</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);
