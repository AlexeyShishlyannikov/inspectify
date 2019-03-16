import 'dart:convert';

import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/models/team.dart';
import 'package:logisticsinspect/store/team_store/team_store.dart';

import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:http/http.dart' as http;

import './team_actions.dart';

ThunkAction<TeamState> addTeam = (Store<TeamState> store) async {
  Map team = store.state.selectedTeam.toJson();
  http.Response response = await http.post(
    Uri.encodeFull(apiUrl + 'teams/add'),
    body: team,
  );
  Team returnedTeam = Team.fromJson(json.decode(response.body));
  store.dispatch(LoadedTeamsAction(
    List.from(store.state.teams)..add(returnedTeam),
  ));
};

ThunkAction<TeamState> updateTeam = (Store<TeamState> store) async {
  Map team = store.state.selectedTeam.toJson();
  http.Response response = await http.put(
    Uri.encodeFull(apiUrl + 'teams/update'),
    body: team,
  );
  Team returnedTeam = Team.fromJson(json.decode(response.body));
  List<Team> teams = List.from(store.state.teams);
  store.dispatch(LoadedTeamsAction(
    teams.map((team) => team.id == returnedTeam.id ? returnedTeam : team),
  ));
};

ThunkAction<TeamState> deleteTeam = (Store<TeamState> store) async {
  http.Response response = await http.delete(
    Uri.encodeFull(apiUrl + 'teams/delete/' + store.state.selectedTeam.id.toString()),
  );
  int deletedId = json.decode(response.body);
  store.dispatch(SelectTeamAction(null));
  store.dispatch(LoadedTeamsAction(
    List.from(store.state.teams)..removeWhere((team) => team.id == deletedId),
  ));
};

ThunkAction<TeamState> getTeam = (Store<TeamState> store) async {
  http.Response response = await http.get(Uri.encodeFull(apiUrl + 'teams/get'));
  Team returnedTeam = Team.fromJson(json.decode(response.body));
  store.dispatch(SelectTeamAction(returnedTeam));
};

ThunkAction<TeamState> getTeams = (Store<TeamState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'teams/getTeams'));
  List<Map> jsonList = json.decode(response.body);
  List<Team> returnedTeams =
      jsonList.map((teamJson) => Team.fromJson(json.decode(response.body)));
  store.dispatch(LoadedTeamsAction(returnedTeams));
};
