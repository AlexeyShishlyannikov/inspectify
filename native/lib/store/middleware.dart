import 'dart:async';
import 'dart:convert';

import 'package:redux/redux.dart';
import 'package:shared_preferences/shared_preferences.dart';

import './company_store/company_middleware.dart';
import './driver_store/driver_middleware.dart';
import './report_form_store/report_form_middleware.dart';
import './report_store/report_middleware.dart';
import './team_store/team_middleware.dart';
import './user_store/user_middleware.dart';
import './vehicle_store/vehicle_middleware.dart';

import 'store_model.dart';
import './actions.dart';

void saveToPrefs(AppState state) async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  var string = json.encode(state.toJson());
  print(string);
  await preferences.setString('appState', string);
}

Future<AppState> loadFromPrefs() async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  var string = preferences.getString('appState');
  print(string);
  if (string != null) {
    Map map = json.decode(string);
    return AppState.fromJson(map);
  }
  return AppState.initialState();
}

void appStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  particalStateMiddleware
      .forEach((middleware) => middleware(store, action, next));

  if (action is LoadFromPreferencesAction) {
    await loadFromPrefs()
        .then((state) => store.dispatch(LoadedFromPreferencesAction(state)));
  }
}

final List<Function(Store<AppState>, dynamic, Function(dynamic))>
    particalStateMiddleware = [
  companyStateMiddleware,
  driverStateMiddleware,
  reportFormStateMiddleware,
  reportStateMiddleware,
  teamStateMiddleware,
  userStateMiddleware,
  vehicleStateMiddleware
];
