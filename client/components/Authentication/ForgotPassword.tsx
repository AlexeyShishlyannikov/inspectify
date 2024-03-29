import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IForgotPasswordAction } from 'client/store/authentication/authenticationActions';

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

type IForgotPasswordState = IForgotPasswordAction;

class ForgotPassword extends React.Component<any, IForgotPasswordState> {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            email: ''
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

    isButtonDisabled = () => {
        return !this.state.email;
    };

    render() {
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
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                        />
                    </FormControl>
                    <Button
                        disabled={this.isButtonDisabled()}
                        className={classes.marginTop}
                        variant="contained"
                        color="primary"
                    >
                        Reset Password
                    </Button>
                    <div
                        className={classNames(classes.marginTop, classes.links)}
                    >
                        <Link to="login">Login</Link>
                        <Link to="register">Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(ForgotPassword);
