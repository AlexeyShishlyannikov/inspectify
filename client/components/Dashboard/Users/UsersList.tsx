import { Card, CardContent, CardHeader, CircularProgress, List } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';

import { IPerson } from '../../../models/person';
import { ApplicationState } from '../../../store';
import { PeopleThunks } from '../../../store/people/peopleThunks';
import UserListItem from './UserListItem';

interface IUsersListProps {
    people: IPerson[];
    isLoading: boolean;
}

class UsersList extends React.Component<IUsersListProps> {

    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress />;
        } else if (this.props.people.length === 0) {
            Content = () => <CardContent><div>No Active Users found.</div></CardContent>;
        } else {
            Content = () => <List>
                {this.props.people.map(person => <UserListItem key={person.id} person={person} />)}
            </List>;
        }
        return (
            <Card style={{ marginTop: '15px' }}>
                <CardHeader title="Active Users" />
                <Content />
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        people: state.people.people,
        isLoading: state.authentication.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPeople: (searchTerm: string) => dispatch(PeopleThunks.getPeople(searchTerm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
