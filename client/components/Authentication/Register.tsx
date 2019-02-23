import * as React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import { IRegister } from './models/AccontModels';

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
    }
});

interface IRegisterState extends IRegister {
    showPassword: boolean;
}

class Register extends React.Component<any, IRegisterState> {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.handleClickShowPassword.bind(this);
    }

    componentWillMount() {
        this.setState({
            userName: '',
            password: '',
            confirmPassword: '',
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

    isButtonDisabled = () => {
        return (
            !this.state.userName ||
            !this.state.password ||
            !this.state.confirmPassword
        );
    };

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
                    <FormControl
                        className={classNames(
                            classes.margin,
                            classes.textField
                        )}
                    >
                        <InputLabel htmlFor="confirmPassword">
                            Confirm Password
                        </InputLabel>
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
                        className={classes.marginTop}
                        variant="contained"
                        color="primary"
                    >
                        Register
                    </Button>
                    <Link className={classes.marginTop} to="login">
                        Sign in
                    </Link>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(Register);
