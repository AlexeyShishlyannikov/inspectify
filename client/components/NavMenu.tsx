import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { withStyles, StyleRules } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ApplicationState } from 'client/store';
import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ILogoutAction } from '../store/authentication/authenticationActions';
import ProfileDropdown from './Dashboard/Profile/ProfileDropdown';

const styles: StyleRules = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    toolbar: {
        justifyContent: 'space-between'
    },
    navButton: {
        color: 'white',
        textDecoration: 'none'
    },
    rightPanel: {
        display: 'flex',
        flexDirection: 'row'
    }
};

interface INavProps {
    isAuthenticated: boolean;
    logout: () => void;
    classes: Record<string, string>;
}

const NavMenu = (props: INavProps) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.leftPanel}>
                        <NavLink to="/">
                            <Button className={classes.navButton} color="inherit">
                                <Typography variant="h6" color="inherit">Inspectify</Typography>
                            </Button>
                        </NavLink>
                    </div>
                    <div className={classes.rightPanel}>
                        {
                            !props.isAuthenticated &&
                            [
                                <NavLink key="1" to="login">
                                    <Button className={classes.navButton} color="inherit">Login</Button>
                                </NavLink>,
                                <NavLink key="2" to="registerCompany">
                                    <Button className={classes.navButton} color="inherit">Register</Button>
                                </NavLink>
                            ]
                        }
                        {props.isAuthenticated && [
                            <NavLink key="3" to="/dashboard">
                                <Button className={classes.navButton} color="inherit">Dashboard</Button>
                            </NavLink>,
                            <ProfileDropdown key="4" />
                        ]}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
    };
}

const dispatchToProps = dispatch => {
    return {
        logout: () => {
            const action: ILogoutAction = { type: "LOGOUT_ACTION" };
            dispatch(action)
        }
    };
};

export default connect(mapStateToProps, dispatchToProps)(withStyles(styles as any)(NavMenu));
