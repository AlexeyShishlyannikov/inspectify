import 'package:flutter/foundation.dart';

class Vehicle {
  final String id;
  final String name;
  final VehicleMake make;
  final VehicleModel model;
  final String licensePlate;
  final int year;

  Vehicle({
    @required this.id,
    @required this.name,
    @required this.make,
    @required this.model,
    @required this.licensePlate,
    @required this.year,
  });

  Vehicle copyWith({
    String id,
    String licensePlate,
    VehicleMake make,
    VehicleModel model,
    String name,
    int year,
  }) {
    return Vehicle(
      id: id ?? this.id,
      name: name ?? this.name,
      make: make ?? this.make,
      model: model ?? this.model,
      licensePlate: licensePlate ?? this.licensePlate,
      year: year ?? this.year,
    );
  }

  Vehicle.fromJson(Map json)
      : id = json['id'],
        name = json['name'],
        make = json['make'],
        model = json['model'],
        licensePlate = json['license_plate'],
        year = json['year'];

  Map toJson() => {
        'name': name,
        'make': make,
        'model': model,
        'license_plate': licensePlate,
        'year': year,
      };

  @override
  String toString() => toJson().toString();
}

class VehicleModel {
  final String id;
  final String name;

  VehicleModel({
    @required this.id,
    @required this.name,
  });

  VehicleModel copyWith({
    String id,
    String name,
  }) {
    return VehicleModel(
      id: id ?? this.id,
      name: name ?? this.name,
    );
  }

  VehicleModel.fromJson(Map json)
      : id = json['id'],
        name = json['name'];

  Map toJson() => {
        'id': id,
        'name': name,
      };

  @override
  String toString() => toJson().toString();
}

class VehicleMake {
  final String id;
  final String logoUri;
  final String name;
  final List<VehicleModel> models;

  VehicleMake({
    @required this.id,
    @required this.name,
    @required this.logoUri,
    this.models,
  });

  VehicleMake copyWith({
    String id,
    String name,
    String logoUri,
    List<VehicleModel> models,
  }) {
    return VehicleMake(
      id: id ?? this.id,
      name: name ?? this.name,
      logoUri: logoUri ?? this.logoUri,
      models: models ?? this.models,
    );
  }

  VehicleMake.fromJson(Map json)
      : id = json['id'],
        name = json['name'],
        logoUri = json['logo_uri'],
        models = (json['models'] as List)
            .map((model) => VehicleModel.fromJson(model))
            .toList();

  Map toJson() => {
        'id': id,
        'name': name,
        'logo_uri': logoUri,
        'models': models.map((model) => model.toJson()).toList(),
      };

  @override
  String toString() => toJson().toString();
}
