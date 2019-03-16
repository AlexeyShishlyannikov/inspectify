import 'dart:convert';

class User {
  final String token;
  String email;
  int expirationDate;
  String teamId;
  String companyId;
  bool isCompany;

  User(this.token) {
    var decodedToken = _parseJwt(token);
    expirationDate = decodedToken['exp'];
    email = decodedToken['email'];
    teamId = decodedToken['teamId'] != '' ? decodedToken['teamId'] : null;
    companyId =
        decodedToken['companyId'] != '' ? decodedToken['companyId'] : null;
    isCompany = decodedToken['isCompany'] == 'true';
  }

  factory User.fromJson(Map json) => User(json['token']);

  Map toJson() => {'token': token};

  @override
  String toString() => toJson().toString();

  Map<String, dynamic> _parseJwt(String token) {
    final parts = token.split('.');
    if (parts.length != 3) {
      throw Exception('invalid token');
    }

    final payload = _decodeBase64(parts[1]);
    final payloadMap = json.decode(payload);
    if (payloadMap is! Map<String, dynamic>) {
      throw Exception('invalid payload');
    }

    return payloadMap;
  }

  String _decodeBase64(String token) {
    String output = token.replaceAll('-', '+').replaceAll('_', '/');

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw Exception('Illegal base64url string!"');
    }

    return utf8.decode(base64Url.decode(output));
  }
}
