import 'package:logisticsinspect/models/vehicle.dart';
import 'package:logisticsinspect/store/vehicle_store/vehicle_store.dart';
import './vehicle_actions.dart';

VehicleState vehicleStateReducer(VehicleState state, action) {
  return VehicleState(
    selectedVehicle: selectedVehicleReducer(state.selectedVehicle, action),
    vehicles: vehiclesReducer(state.vehicles, action),
  );
}

List<Vehicle> vehiclesReducer(List<Vehicle> state, action) {
  if (action is AddVehicleAction) {
    return []
      ..addAll(state)
      ..add(action.vehicle);
  }
  if (action is RemoveVehicleAction) {
    return List.unmodifiable(List.from(state)..remove(action.vehicle));
  }
  if (action is UpdateVehicleAction) {
    return []
      ..addAll(state)
      ..map((vehicle) =>
          vehicle.id == action.vehicle.id ? action.vehicle : vehicle);
  }

  if (action is LoadedVehiclesAction) {
    return action.vehicles;
  }

  return state;
}

Vehicle selectedVehicleReducer(Vehicle state, action) {
  if (action is SelectVehicleAction) {
    return action.vehicle;
  }

  return state;
}
