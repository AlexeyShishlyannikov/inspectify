import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, RouteProps } from 'react-router';

import { IPerson } from '../../../models/person';
import { ITeam } from '../../../models/Team';
import { ApplicationState } from '../../../store';
import { PeopleThunks } from '../../../store/people/peopleThunks';
import { TeamThunks } from '../../../store/team/teamThunks';
import UserCard from './UserCard';
import './UserView.scss';

type IUserViewProps = RouteComponentProps & RouteProps & {
    selectedPerson?: IPerson;
    selectedTeam?: ITeam;
    getTeam: (id: string) => void;
    getPerson: (id: string) => void;
}

class UserView extends React.Component<IUserViewProps> {
    componentWillMount() {
        const id: string = this.props.match.params['id'];
        this.props.getPerson(id);
    }

    componentWillReceiveProps(newProps: IUserViewProps) {
        if (newProps.selectedPerson && newProps.selectedPerson !== this.props.selectedPerson && newProps.selectedPerson.team) {
            // this.props.getTeam(newProps.selectedPerson.team.id as string);
        }
    }

    render() {
        return (
            <div className="user-view-container">
                <UserCard />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    selectedTeam: state.teams.selectedTeam,
    selectedPerson: state.people.selectedPerson
})

const mapDispatchToProps = (dispatch) => ({
    getTeam: (id: string) => dispatch(TeamThunks.getTeam(id)),
    getPerson: (id: string) => dispatch(PeopleThunks.getPerson(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
