import './Teams.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { ITeam } from '../../../models/team';
import { ApplicationState } from '../../../store';
import { ISwitchEditTeamModeAction } from '../../../store/team/teamActions';
import EditTeamForm from './EditTeamForm';
import TeamsList from './TeamsList';

interface ITeamsProps {
  teams: ITeam[];
  selectedTeam?: ITeam;
  setEditMode: (isEdit: boolean) => void;
}

const Teams = (props: ITeamsProps) => {
  props.setEditMode(false);
  return (
    <div className="dashboard-teams">
      <EditTeamForm />
      <TeamsList />
    </div>
  )
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    isLoading: state.authentication.isLoading,
    errorMessage: state.authentication.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditMode: (mode: boolean) => {
      const action: ISwitchEditTeamModeAction = {
        type: "SWITCH_EDIT_TEAM_MODE_ACTION",
        status: mode
      };
      return dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
