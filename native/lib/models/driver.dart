import 'package:flutter/foundation.dart';

class Driver {
  final String id;
  final String firstName;
  final String lastName;

  Driver({
    @required this.id,
    @required this.firstName,
    @required this.lastName,
  });

  Driver copyWith({
    String id,
    String firstName,
    String lastName,
  }) {
    return Driver(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
    );
  }

  Driver.fromJson(Map json)
      : id = json['id'],
        firstName = json['firstName'],
        lastName = json['lastName'];

  Map toJson() => {
        'id': id,
        'firstName': firstName,
        'lastName': lastName,
      };

  @override
  String toString() => toJson().toString();
}
