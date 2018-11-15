import * as React from 'react';
import {
  StyleRulesCallback,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  withStyles
} from '@material-ui/core';
import classNames = require('classnames');
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

class ResetPassword extends React.Component<
  any,
  {
    showPassword: boolean;
    password: string;
    confirmPassword: string;
  }
> {
  constructor(props) {
    super(props);
    this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.formContainer}>
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
          <FormControl
            className={classNames(classes.margin, classes.textField)}
          >
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
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
            className={classes.marginTop}
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ResetPassword);
