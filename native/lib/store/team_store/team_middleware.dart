import 'package:logisticsinspect/store/middleware.dart';
import 'package:logisticsinspect/store/store_model.dart';

import './team_actions.dart';
import 'package:redux/redux.dart';

void teamStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  if (action is AddTeamAction ||
      action is RemoveTeamAction ||
      action is SelectTeamAction ||
      action is UpdateTeamAction) {
    saveToPrefs(store.state);
  }

  if (action is GetTeamsAction) {
    await loadFromPrefs()
        .then((state) => store.dispatch(LoadedTeamsAction(state.teamState.teams)));
  }
}
