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
import { IResetPassword } from './models/AccontModels';

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

interface IResetPasswordState extends IResetPassword {
  showPassword: boolean;
}

class ResetPassword extends React.Component<any, IResetPasswordState> {
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

  isButtonDisabled = () => !this.state.password || !this.state.confirmPassword;

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
            disabled={this.isButtonDisabled()}
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
