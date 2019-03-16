import 'package:logisticsinspect/models/team.dart';

class GetTeamsAction {
  final String companyId;

  GetTeamsAction(this.companyId);
}

class LoadedTeamsAction {
  final List<Team> teams;

  LoadedTeamsAction(this.teams);
}

class AddTeamAction {
  final Team team;

  AddTeamAction(this.team);
}

class UpdateTeamAction {
  final Team team;

  UpdateTeamAction(this.team);
}

class RemoveTeamAction {
  final Team team;

  RemoveTeamAction(this.team);
}

class SelectTeamAction {
  final Team team;

  SelectTeamAction(this.team);
}
