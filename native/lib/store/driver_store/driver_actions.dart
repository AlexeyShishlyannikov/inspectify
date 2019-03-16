import 'package:flutter/foundation.dart';
import 'package:logisticsinspect/models/driver.dart';

class LoadedDriversAction {
  final List<Driver> drivers;

  LoadedDriversAction(this.drivers);
}

class GetDriversAction {
  final int teamId;
  final int companyId;
  final int vehicleId;

  GetDriversAction({
    this.teamId,
    this.companyId,
    this.vehicleId,
  });
}

class AddDriverAction {
  final Driver driver;
  final int teamId;
  final int companyId;

  AddDriverAction({
    @required this.driver,
    this.teamId,
    this.companyId,
  });
}

class RemoveDriverAction {
  final Driver driver;

  RemoveDriverAction(this.driver);
}

class UpdateDriverAction {
  final Driver driver;

  UpdateDriverAction(this.driver);
}

class SelectDriverAction {
  final Driver driver;

  SelectDriverAction(this.driver);
}
