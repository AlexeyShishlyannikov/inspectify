import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import LayersIcon from '@material-ui/icons/Layers';
import InboxIcon from '@material-ui/icons/Inbox';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import FormIcon from '@material-ui/icons/Assignment';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.scss';

import { MenuItem, MenuList, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';

interface IDashboardProps {
    path: string;
    children: any;
}
const Dashboard = (props: IDashboardProps) => {
    return (
        <div className="dashboard-body">
            <MenuList className="dashboard-panel">
                <NavLink className="dashboard-link" to={props.path}>
                    <MenuItem className="dashboard-menu-item">
                        <ListItemIcon ><HomeIcon /></ListItemIcon>
                        <ListItemText inset primary="Home" />
                    </MenuItem>
                </NavLink>
                <NavLink className="dashboard-link" to={props.path + "/users"}>
                    <MenuItem className="dashboard-menu-item">
                        <ListItemIcon ><PersonAddIcon /></ListItemIcon>
                        <ListItemText inset primary="Users" />
                    </MenuItem>
                </NavLink>
                <NavLink className="dashboard-link" to={props.path + "/teams"}>
                    <MenuItem className="dashboard-menu-item">
                        <ListItemIcon ><PeopleIcon /></ListItemIcon>
                        <ListItemText inset primary="Teams" />
                    </MenuItem>
                </NavLink>
                <NavLink className="dashboard-link" to={props.path + "/vehicle"}>
                    <MenuItem className="dashboard-menu-item">
                        <ListItemIcon ><LayersIcon /></ListItemIcon>
                        <ListItemText inset primary="Inventory" />
                    </MenuItem>
                </NavLink>
                <NavLink className="dashboard-link" to={props.path + "/reports"}>
                    <MenuItem className="dashboard-menu-item">
                        <ListItemIcon ><InboxIcon /></ListItemIcon>
                        <ListItemText inset primary="Reports" />
                    </MenuItem>
                </NavLink>
                <NavLink className="dashboard-link" to={props.path + "/forms"}>
                    <MenuItem className="dashboard-menu-item">
                        <ListItemIcon ><FormIcon /></ListItemIcon>
                        <ListItemText inset primary="Forms" />
                    </MenuItem>
                </NavLink>
            </MenuList>
            <div className="dashboard-children">
                {props.children}
            </div>
        </div>
    );
}

export default (Dashboard);