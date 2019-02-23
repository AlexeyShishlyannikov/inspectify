import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from 'client/store';
import { ILogoutAction } from '../store/authentication/authenticationActions';

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    navButton: {
        color: 'white'
    }
};

interface INavProps {
    isAuthenticated: boolean;
    logout: () => void;
    classes: any;
}

const NavMenu = (props: INavProps) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>Inspectify</Typography>
                    <NavLink to="/">
                        <Button className={classes.navButton} color="inherit">Home</Button>
                    </NavLink>
                    {
                        !props.isAuthenticated &&
                        [
                            <NavLink key="1" to="login">
                                <Button className={classes.navButton} color="inherit">Login</Button>
                            </NavLink>,
                            <NavLink key="2" to="register">
                                <Button className={classes.navButton} color="inherit">Register</Button>
                            </NavLink>
                        ]
                    }
                    {
                        props.isAuthenticated &&
                        <Button onClick={props.logout} className={classes.navButton} color="inherit">Logout</Button>
                    }
                    <NavLink to="teams">
                        <Button className={classes.navButton} color="inherit">Teams</Button>
                    </NavLink>
                    <NavLink to="company">
                        <Button className={classes.navButton} color="inherit">Company</Button>
                    </NavLink>
                    <NavLink to="vehicle">
                        <Button className={classes.navButton} color="inherit">Vehicle</Button>
                    </NavLink>
                    <NavLink to="reports">
                        <Button className={classes.navButton} color="inherit">Reports</Button>
                    </NavLink>
                    <NavLink to="forms">
                        <Button className={classes.navButton} color="inherit">Forms</Button>
                    </NavLink>
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

export default connect(mapStateToProps, dispatchToProps)(withStyles(styles)(NavMenu));
