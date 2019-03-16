import 'package:logisticsinspect/models/team.dart';

class TeamState {
  final Team selectedTeam;
  final List<Team> teams;

  TeamState({
    this.selectedTeam,
    this.teams,
  });

  TeamState.fromJson(Map json)
      : teams = (json['teams'] as List).map((team) => Team.fromJson(team)),
        selectedTeam = Team.fromJson(json['selectedTeam']);

  Map toJson() => {
        'teams': teams.map((team) => team.toJson()),
        'selectedTeam': selectedTeam != null ? selectedTeam.toJson() : null,
      };

  TeamState.initialState()
      : teams = [],
        selectedTeam = null;
}
