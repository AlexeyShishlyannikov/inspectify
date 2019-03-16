import 'package:logisticsinspect/store/middleware.dart';
import 'package:logisticsinspect/store/store_model.dart';

import './driver_actions.dart';

import 'package:redux/redux.dart';

void driverStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  if (action is AddDriverAction ||
      action is RemoveDriverAction ||
      action is UpdateDriverAction) {
    saveToPrefs(store.state);
  }

  if (action is GetDriversAction) {
    await loadFromPrefs().then((state) =>
        store.dispatch(LoadedDriversAction(state.driverState.drivers)));
  }
}
