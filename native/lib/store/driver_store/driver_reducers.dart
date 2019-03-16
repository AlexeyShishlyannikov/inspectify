import 'package:logisticsinspect/models/driver.dart';
import 'package:logisticsinspect/store/driver_store/driver_store.dart';
import './driver_actions.dart';

DriverState driverStateReducer(DriverState state, action) {
  return DriverState(
    drivers: driversReducer(state.drivers, action),
    selectedDriver: selectedDriverReducer(state.selectedDriver, action),
  );
}

Driver selectedDriverReducer(Driver selectedDriver, action) {
  if (action is RemoveDriverAction) {
    return action.driver == selectedDriver ? null : selectedDriver;
  }
  if (action is SelectDriverAction) {
    return action.driver;
  }
  if (action is UpdateDriverAction) {
    return action.driver == selectedDriver ? action.driver : selectedDriver;
  }

  return selectedDriver;
}

List<Driver> driversReducer(List<Driver> drivers, action) {
  if (action is AddDriverAction) {
    return []
      ..addAll(drivers)
      ..add(action.driver);
  }
  if (action is LoadedDriversAction) {
    return []..addAll(action.drivers);
  }
  if (action is RemoveDriverAction) {
    return []
      ..addAll(drivers)
      ..remove(action.driver);
  }
  if (action is UpdateDriverAction) {
    final int driverIndex =
        drivers.indexWhere((driver) => driver.id == action.driver.id);
    return []
      ..addAll(drivers)
      ..replaceRange(driverIndex, driverIndex + 1, [action.driver]);
  }

  return drivers;
}
