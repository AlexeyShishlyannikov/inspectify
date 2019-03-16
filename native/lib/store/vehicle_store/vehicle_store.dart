import 'package:flutter/foundation.dart';
import '../../models/vehicle.dart';

class VehicleState {
  final Vehicle selectedVehicle;
  final List<Vehicle> vehicles;

  VehicleState({
    @required this.selectedVehicle,
    @required this.vehicles,
  });

  VehicleState.initialState()
      : vehicles = [],
        selectedVehicle = null;

  VehicleState.fromJson(Map json)
      : selectedVehicle = Vehicle.fromJson(json['selectedVehicle']),
        vehicles = (json['vehicles'] as List)
            .map((vehicle) => Vehicle.fromJson(json['selectedVehicle']));

  Map toJson() => {
        'vehicles': vehicles.map((v) => v.toJson()),
        'selectedVehicle':
            selectedVehicle != null ? selectedVehicle.toJson() : null,
      };
}
