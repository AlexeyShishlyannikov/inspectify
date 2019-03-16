import 'package:flutter/foundation.dart';

class Company {
  final String id;
  final String logoUri;
  final String name;

  Company({
    @required this.id,
    @required this.logoUri,
    @required this.name,
  });

  Company copyWith({
    String id,
    String logoUri,
    String name,
    String userId,
  }) {
    return Company(
      id: id ?? this.id,
      logoUri: logoUri ?? this.logoUri,
      name: name ?? this.name,
    );
  }

  Company.fromJson(Map json)
      : logoUri = json['logo_uri'],
        id = json['id'],
        name = json['name'];

  Map toJson() => {
        'id': id,
        'logo_uri': logoUri,
        'name': name,
      };

  @override
  String toString() => toJson().toString();
}
