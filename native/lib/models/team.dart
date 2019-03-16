import 'package:flutter/foundation.dart';
import 'package:logisticsinspect/models/driver.dart';

class Team {
  final int id;
  final String name;
  final String description;
  final List<Driver> drivers;

  Team({
    @required this.id,
    @required this.name,
    @required this.description,
    @required this.drivers,
  });

  Team copyWith({
    int id,
    String name,
    String description,
    List<Driver> drivers,
  }) {
    return Team(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      drivers: drivers ?? this.drivers,
    );
  }

  Team.fromJson(Map json)
      : id = json['id'],
        name = json['name'],
        description = json['description'],
        drivers = (json['drivers'] as List<Map>)
            .map((driver) => Driver.fromJson(driver));

  Map toJson() => {
        'id': id,
        'name': name,
        'description': description,
        'drivers': drivers.map((driver) => driver.toJson()),
      };

  @override
  String toString() => toJson().toString();
}
