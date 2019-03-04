import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import { IPerson } from 'client/models/person';
import { ApplicationState } from 'client/store';
import * as React from 'react';
import { connect } from 'react-redux';

import UserListItem from '../Users/UserListItem';
import CardContent from '@material-ui/core/CardContent';

interface TeamUserListProps {
    people: IPerson[];
    isLoading: boolean;
    errorMessage?: string;
}

class TeamUserList extends React.Component<TeamUserListProps> {
    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress />;
        } else if (this.props.people.length === 0) {
            Content = () => <CardContent> <div>No Team Members found.</div> </CardContent>;
        } else {
            Content = () => <List>
                {this.props.people.map(person => <UserListItem person={person} />)}
            </List>;
        }
        return (
            <Card style={{ marginTop: '15px' }}>
                <CardHeader title="Team Members" />
                <Content />
            </Card>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        people: state.people.people,
        isLoading: state.teams.isLoading,
        errorMessage: state.teams.errorMessage
    };
};

export default connect(mapStateToProps)(TeamUserList)
