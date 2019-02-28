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
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
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
    inviteUser: (invitation: IInvitation) => void;
    selectInvitation: (invitation: IInvitation) => void;
}

class InvitationList extends React.Component<IInvitationListProps, {}> {
    componentWillMount() {
        this.props.getInvitations();
    }

    render() {
        console.log(typeof this.props.invitations[0].sentOn);
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
                            <div style={{ display: 'flex' }}>
                                <IconButton aria-label="Send" onClick={() => this.props.inviteUser}>
                                    <SendIcon />
                                </IconButton>
                                <IconButton aria-label="Edit" onClick={() => this.props.selectInvitation}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>;
        }
        return (
            <Card>
                <CardHeader title="Pending Invites" />
                <CardContent>
                    <Content />
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
        inviteUser: (invitation: IInvitation) => dispatch(InvitationThunks.sendInvitation(invitation)),
        selectInvitation: (invitation: IInvitation) => {
            const action: ISelectInvitationAction = {
                type: "SELECT_INVITATION_ACTION",
                selectedInvitation: invitation
            }
            return dispatch(action);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(InvitationList);