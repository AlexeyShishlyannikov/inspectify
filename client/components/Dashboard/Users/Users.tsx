import * as React from 'react'
import './Users.scss';
import InvitationForm from './Invitations/InvitationForm';
import InvitationList from './Invitations/InvitationList';
import UsersList from './UsersList';
import { ApplicationState } from '../../../store';
import { PeopleThunks } from '../../../store/people/peopleThunks';
import { connect } from 'react-redux';

interface IUsersProps {
    getPeople: (searchTerm: string) => void;
}

class Users extends React.Component<IUsersProps> {
    componentWillMount() {
        this.props.getPeople('');
    }

    public render() {
        return (
            <div className="dashboard-users">
                <InvitationForm />
                <InvitationList />
                <UsersList />
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPeople: (searchTerm: string) => dispatch(PeopleThunks.getPeople(searchTerm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);