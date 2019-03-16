import 'package:logisticsinspect/models/driver.dart';

class DriverState {
  final Driver selectedDriver;
  final List<Driver> drivers;

  DriverState({
    this.selectedDriver,
    this.drivers,
  });

  DriverState.fromJson(Map json)
      : selectedDriver = Driver.fromJson(json['selectedDriver']),
        drivers =
            (json['drivers'] as List).map((driver) => Driver.fromJson(driver));

  DriverState.initialState()
      : drivers = [],
        selectedDriver = null;

  Map toJson() => {
        'selectedDriver': selectedDriver != null ? selectedDriver.toJson() : null,
        'drivers': drivers.map((driver) => driver.toJson()),
      };
}
