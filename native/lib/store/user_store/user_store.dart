import 'package:flutter/foundation.dart';
import 'package:logisticsinspect/models/user.dart';

class UserState {
  final User user;
  final bool isAuthenticated;
  final bool isLoading;

  UserState({
    @required this.user,
    @required this.isAuthenticated,
    @required this.isLoading,
  });

  UserState.initialState()
      : user = null,
        isAuthenticated = false,
        isLoading = false;

  UserState.fromJson(Map json)
      : user = User.fromJson(json['token']),
        isAuthenticated = json['token'] != null,
        isLoading = false;

  Map toJson() => {
        'user': user.toString(),
        'isAuthenticated': isAuthenticated,
      };
}
