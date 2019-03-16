import 'package:logisticsinspect/store/middleware.dart';
import 'package:logisticsinspect/store/store_model.dart';

import './report_actions.dart';
import 'package:redux/redux.dart';

void reportStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  if (action is AddReportAction ||
      action is UpdateReportAction ||
      action is SelectReportAction) {
    saveToPrefs(store.state);
  }

  if (action is GetReportsAction) {
    await loadFromPrefs().then((state) =>
        store.dispatch(LoadedReportsAction(state.reportState.reports)));
  }
}
