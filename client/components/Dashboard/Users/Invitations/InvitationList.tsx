import {
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    CardHeader,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { connect } from 'react-redux';

import { IInvitation } from '../../../../models/invitation';
import { ApplicationState } from '../../../../store';
import { ISelectInvitationAction } from '../../../../store/invitations/invitationsActions';
import { InvitationThunks } from '../../../../store/invitations/invitationsThunks';

interface IInvitationListProps {
    invitations: IInvitation[];
    isLoading: boolean;
    getInvitations: () => void;
    deleteUser: (id: string) => void;
}

class InvitationList extends React.Component<IInvitationListProps, {}> {
    componentWillMount() {
        this.props.getInvitations();
    }

    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress></CircularProgress>;
        } else if (this.props.invitations.length === 0) {
            Content = () => <div>No Invitations found</div>;
        } else {
            Content = () => <List>
                {this.props.invitations.map(invitation => (
                    <ListItem key={invitation.id} dense>
                        <ListItemText
                            primary={
                                <Typography variant="title">{invitation.firstName + ' ' + invitation.lastName}</Typography>
                            }
                            secondary={[
                                <span key={invitation.email}>Email: {invitation.email}</span>,
                                invitation.phoneNumber && <span style={{ marginLeft: '10px' }} key={invitation.phoneNumber}>Phone: {invitation.phoneNumber}</span>,
                                (() => {
                                    const sentOn = new Date(invitation.sentOn ? invitation.sentOn : '');
                                    return invitation.sentOn && <span style={{ marginLeft: '10px' }} key={sentOn.getTime()}>Sent on: {sentOn.getMonth()}/{sentOn.getDate()}</span>;
                                })(),
                            ]}
                        />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="delete" color="secondary" onClick={() => this.props.deleteUser(invitation.id as string)}>
                                <CloseIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>;
        }
        return (
            <Card>
                <CardHeader title="Pending Invites" />
                <CardContent>
                    { this.props.isLoading ? <CircularProgress /> : <Content /> }
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        invitations: state.invitations.invitations,
        isLoading: state.authentication.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInvitations: () => dispatch(InvitationThunks.getInvitations()),
        deleteUser: (id: string) => dispatch(InvitationThunks.deleteInvitation(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(InvitationList);