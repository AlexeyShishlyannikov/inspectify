import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Button
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

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

class Login extends React.Component<
  any,
  {
    showPassword: boolean;
    password: string;
    email: string;
  }
> {
  constructor(props) {
    super(props);
    this.handleChange.bind(this);
    this.handleClickShowPassword.bind(this);
  }

  componentWillMount() {
    this.setState({
      email: '',
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

  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <FormControl
            className={classNames(classes.margin, classes.textField)}
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              type={this.state.showPassword ? 'text' : 'email'}
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
          </FormControl>
          <FormControl
            className={classNames(classes.margin, classes.textField)}
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
            className={classes.marginTop}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <div className={classNames(classes.marginTop, classes.links)}>
            <Link to="register">Register</Link>
            <Link to="resetPassword">Forgot Password</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
