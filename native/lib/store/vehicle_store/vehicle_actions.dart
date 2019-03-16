import 'package:flutter/foundation.dart';
import '../../models/vehicle.dart';

class LoadedVehiclesAction {
  final List<Vehicle> vehicles;
  LoadedVehiclesAction(this.vehicles);
}

class GetVehiclesAction {
  final String teamId;
  final String companyId;
  final String driverId;
  final String reportId;

  GetVehiclesAction({
    this.teamId,
    this.companyId,
    this.driverId,
    this.reportId,
  });
}

class AddVehicleAction {
  final Vehicle vehicle;
  AddVehicleAction(this.vehicle);
}

class RemoveVehicleAction {
  final Vehicle vehicle;
  RemoveVehicleAction(this.vehicle);
}

class SelectVehicleAction {
  final Vehicle vehicle;
  SelectVehicleAction(this.vehicle);
}

class UpdateVehicleAction {
  final Vehicle vehicle;
  UpdateVehicleAction(this.vehicle);
}
