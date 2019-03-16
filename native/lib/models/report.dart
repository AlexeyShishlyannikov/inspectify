import 'package:flutter/foundation.dart';
import 'package:logisticsinspect/models/driver.dart';
import 'package:logisticsinspect/models/report_form.dart';
import 'package:logisticsinspect/models/vehicle.dart';

class Report {
  final String id;
  final String name;
  final Vehicle vehicle;
  final ReportForm form;
  final Driver driver;
  final DateTime dateCreated;
  final DateTime dateUpdated;

  Report({
    @required this.id,
    @required this.name,
    @required this.vehicle,
    @required this.form,
    @required this.driver,
    @required this.dateCreated,
    this.dateUpdated,
  });

  Report copyWith({
    String id,
    String name,
    Vehicle vehicle,
    ReportForm form,
    Driver driver,
    DateTime dateCreated,
    DateTime dateUpdated,
  }) {
    return Report(
      id: id ?? this.id,
      name: name ?? this.name,
      vehicle: vehicle ?? this.vehicle,
      form: form ?? this.form,
      driver: driver ?? this.driver,
      dateCreated: dateCreated ?? this.dateCreated,
      dateUpdated: dateUpdated ?? this.dateUpdated,
    );
  }

  Report.fromJson(Map json)
      : id = json['id'],
        name = json['name'],
        vehicle = Vehicle.fromJson(json['vehicle']),
        form = ReportForm.fromJson(json['form']),
        driver = Driver.fromJson(json['driver']),
        dateCreated = json['dateCreated'],
        dateUpdated = json['dateUpdated'];

  Map toJson() => {
        'id': id,
        'name': name,
        'vehicle': vehicle.toJson(),
        'form': form.toJson(),
        'driver': driver.toJson(),
        'dateCreated': dateCreated,
        'dateUpdated': dateUpdated,
      };

  @override
  String toString() => toJson().toString();
}
