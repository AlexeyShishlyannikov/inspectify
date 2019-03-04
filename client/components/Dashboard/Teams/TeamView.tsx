import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, RouteProps } from 'react-router-dom';

import { ITeam } from '../../../models/Team';
import { ApplicationState } from '../../../store';
import { ISwitchEditTeamModeAction } from '../../../store/team/teamActions';
import { TeamThunks } from '../../../store/team/teamThunks';
import EditTeamForm from './EditTeamForm';
import TeamCard from './TeamCard';
import './TeamView.scss';
import { PeopleThunks } from '../../../store/people/peopleThunks';
import UsersList from '../Users/UsersList';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import TeamUserList from './TeamUserList';

interface ITeamViewProps {
    isEditMode: boolean;
    selectedTeam?: ITeam;
    isLoading: boolean;
    errorMessage?: string;
    getTeam: (id: string) => void;
    getPeopleForTeam: (teamId: string) => void;
    deleteTeam: (id: string) => void;
    setEditMode: (isEdit: boolean) => void;
}

class TeamView extends React.Component<ITeamViewProps & RouteComponentProps & RouteProps> {
    componentWillMount() {
        const id: string = this.props.match.params['id'];
        this.props.getTeam(id);
        this.props.getPeopleForTeam(id);
        this.props.setEditMode(false);
    }

    render() {
        
        return (
            <div className="team-container">
                {this.props.isEditMode
                    ? <EditTeamForm onSave={() => this.props.setEditMode(false)} />
                    : <TeamCard />}
                <TeamUserList />
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isEditMode: state.teams.isEditMode,
        selectedTeam: state.teams.selectedTeam,
        isLoading: state.teams.isLoading,
        errorMessage: state.teams.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTeam: (id: string) => dispatch(TeamThunks.getTeam(id)),
        deleteTeam: (id: string) => dispatch(TeamThunks.deleteTeam(id)),
        setEditMode: (mode: boolean) => {
            const action: ISwitchEditTeamModeAction = {
                type: "SWITCH_EDIT_TEAM_MODE_ACTION",
                status: mode
            };
            return dispatch(action);
        },
        getPeopleForTeam: (teamId: string) => dispatch(PeopleThunks.getPeopleForTeam(teamId, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);
