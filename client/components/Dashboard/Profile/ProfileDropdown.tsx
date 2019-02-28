import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Divider, ListItem, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ProfileIcon from '@material-ui/icons/Person';
import { ApplicationState } from '../../../store';
import { ILogoutAction } from '../../../store/authentication/authenticationActions';
import * as React from 'react';
import { connect } from 'react-redux';
import './ProfileDropdown.scss';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

interface IProfileDropdownProps {
    email?: string;
    logout: () => void;
}

interface IProfileDropdownState {
    open: boolean;
}

class ProfileDropdown extends React.Component<IProfileDropdownProps, IProfileDropdownState> {
    state = {
        open: false
    };
    anchorEl?: HTMLElement;

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl && this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button
                    buttonRef={node => this.anchorEl = node}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    style={{ color: 'white' }}
                    onClick={this.handleToggle}
                >
                    <ProfileIcon />
                </Button>
                <Popper className="profile-dropdown" open={this.state.open} anchorEl={this.anchorEl} placement={'bottom-end'} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: 'right top' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <div>
                                        <ListItem>
                                            <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary={this.props.email} secondary={this.props.email} />
                                        </ListItem>
                                        <Divider light />
                                        <MenuList>
                                            <Link to="/dashboard/profile" onClick={this.handleClose} style={{ textDecoration: 'none' }}>
                                                <MenuItem>Profile</MenuItem>
                                            </Link>
                                            <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                                        </MenuList>
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }
};

const mapStateToProps = (state: ApplicationState) => ({
    email: state.authentication.user ? state.authentication.user.email : undefined
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        <Redirect to="/login"/>
        const action: ILogoutAction = {
            type: "LOGOUT_ACTION"
        };
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown);