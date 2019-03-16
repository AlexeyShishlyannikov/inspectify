import 'package:logisticsinspect/store/middleware.dart';
import 'package:logisticsinspect/store/store_model.dart';
import './vehicle_actions.dart';

import 'package:redux/redux.dart';

void vehicleStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  if (action is AddVehicleAction ||
      action is RemoveVehicleAction ||
      action is SelectVehicleAction ||
      action is UpdateVehicleAction) {
    saveToPrefs(store.state);
  }

  if (action is GetVehiclesAction) {
    await loadFromPrefs()
        .then((state) => store.dispatch(LoadedVehiclesAction(state.vehicleState.vehicles)));
  }
}
