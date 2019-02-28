import * as React from 'react'
import './Users.scss';
import InvitationForm from './Invitations/InvitationForm';
import InvitationList from './Invitations/InvitationList';

export default class Users extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="dashboard-users">
                <InvitationForm />
                <InvitationList />
            </div>
        );
    }
}
