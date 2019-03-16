import 'package:logisticsinspect/models/team.dart';
import 'package:logisticsinspect/store/team_store/team_store.dart';
import './team_actions.dart';

TeamState teamStateReducer(TeamState state, action) {
  return TeamState(
    selectedTeam: selectedTeamReducer(state.selectedTeam, action),
    teams: teamsReducer(state.teams, action),
  );
}

List<Team> teamsReducer(List<Team> teams, action) {
  if (action is AddTeamAction) {
    return []..addAll(teams)..add(action.team);
  }
  if (action is LoadedTeamsAction) {
    return []..addAll(action.teams);
  }
  if (action is RemoveTeamAction) {
    return []..addAll(teams)..remove(action.team);
  }
  if (action is UpdateTeamAction) {
    return teams.map((team) => team.id == action.team.id ? action.team : team);
  }

  return teams;
}

Team selectedTeamReducer(Team selectedTeam, action) {
  if (action is SelectTeamAction) {
    return action.team;
  }
  if (action is UpdateTeamAction) {
    return action.team.id == selectedTeam.id ? action.team : selectedTeam;
  }
  if (action is RemoveTeamAction) {
    return action.team.id == selectedTeam.id ? null : selectedTeam;
  }

  return selectedTeam;
}
