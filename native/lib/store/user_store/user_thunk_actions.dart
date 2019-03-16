import 'dart:convert';

import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/models/user.dart';
import 'package:logisticsinspect/store/store_model.dart';

import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:http/http.dart' as http;

import './user_actions.dart';

ThunkAction<AppState> registerUser(RegisterUserAction action) =>
    (Store<AppState> store) async {
      store.dispatch(StartLoadingAction());
      http.Response response = await http.post(
        Uri.encodeFull(apiUrl + 'account/register/user'),
        body: json.encode(action.toJson()),
        headers: {
          'Content-Type': 'application/json'
        }
      );
      User returnedTokenUser = User(response.body);
      store.dispatch(LoadedUserAction(returnedTokenUser));
    };

ThunkAction<AppState> registerCompany(RegisterCompanyAction action) =>
    (Store<AppState> store) async {
      store.dispatch(StartLoadingAction());
      http.Response response = await http.post(
        Uri.encodeFull(apiUrl + 'account/register/company'),
        body: json.encode(action.toJson()),
        headers: {
          'Content-Type': 'application/json'
        }
      );
      User returnedTokenUser = User(response.body);
      store.dispatch(LoadedUserAction(returnedTokenUser));
    };

ThunkAction<AppState> loginUser(LoginUserAction action) =>
    (Store<AppState> store) async {
      store.dispatch(StartLoadingAction());
      http.Response response = await http.post(
        Uri.encodeFull(apiUrl + 'account/login'),
        body: json.encode(action.toJson()),
        headers: {
          'Content-Type': 'application/json'
        }
      );
      User returnedTokenUser = User(response.body);
      store.dispatch(LoadedUserAction(returnedTokenUser));
    };

ThunkAction<AppState> forgotPassword(ForgotPasswordAction action) =>
    (Store<AppState> store) async {
      store.dispatch(StartLoadingAction());
      http.Response response = await http.post(
        Uri.encodeFull(apiUrl + 'account/forgot'),
        body: json.encode(action.toJson()),
        headers: {
          'Content-Type': 'application/json'
        }
      );
    };

ThunkAction<AppState> changePassword(ChangePasswordAction action) =>
    (Store<AppState> store) async {
      store.dispatch(StartLoadingAction());
      http.Response response = await http.post(
        Uri.encodeFull(apiUrl + 'account/change'),
        body: json.encode(action.toJson()),
        headers: {
          'Content-Type': 'application/json'
        }
      );
      User returnedTokenUser = User(response.body);
      store.dispatch(LoadedUserAction(returnedTokenUser));
    };

ThunkAction<AppState> resetPassword(ResetPasswordAction action) =>
    (Store<AppState> store) async {
      store.dispatch(StartLoadingAction());
      http.Response response = await http.post(
        Uri.encodeFull(apiUrl + 'account/reset'),
        body: json.encode(action.toJson()),
        headers: {
          'Content-Type': 'application/json'
        }
      );
    };
