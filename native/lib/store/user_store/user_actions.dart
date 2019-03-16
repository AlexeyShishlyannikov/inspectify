import 'package:flutter/foundation.dart';
import 'package:logisticsinspect/models/user.dart';

class RefreshTokenAction {}

class LogoutAction {}

class LoginUserAction {
  final String email;
  final String password;

  LoginUserAction({
    @required this.email,
    @required this.password,
  });

  Map toJson() => {
        'email': email,
        'password': password,
      };
}

class RegisterUserAction {
  final String email;
  final String password;

  RegisterUserAction({
    @required this.email,
    @required this.password,
  });

  Map toJson() => {
        'email': email,
        'password': password,
        'confirmPassword': password,
      };
}

class RegisterCompanyAction {
  final String companyName;
  final String email;
  final String password;

  RegisterCompanyAction({
    @required this.companyName,
    @required this.email,
    @required this.password,
  });

  Map toJson() => {
        'companyName': companyName,
        'email': email,
        'password': password,
        'confirmPassword': password,
      };
}

class ForgotPasswordAction {
  final String email;
  ForgotPasswordAction(this.email);

  Map toJson() => {
        'email': email,
      };
}

class ResetPasswordAction {
  final String email;
  final String password;
  final String resetToken;
  ResetPasswordAction({
    @required this.email,
    @required this.password,
    @required this.resetToken,
  });

  Map toJson() => {
        'email': email,
        'password': password,
        'resetToken': resetToken,
      };
}

class ChangePasswordAction {
  final String email;
  final String password;
  final String oldPassword;
  ChangePasswordAction({
    @required this.email,
    @required this.password,
    @required this.oldPassword,
  });

  Map toJson() => {
        'email': email,
        'password': password,
        'oldPassword': oldPassword,
      };
}

class SetAuthenticationAction {
  final bool isAuthenticated;
  SetAuthenticationAction({
    @required this.isAuthenticated,
  });
}

class StartLoadingAction {}

class LoadedUserAction {
  final User user;

  LoadedUserAction(this.user);
}
