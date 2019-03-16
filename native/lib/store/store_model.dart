import 'package:flutter/foundation.dart';

import './company_store/company_store.dart';
import './driver_store/driver_store.dart';
import './report_form_store/report_form_store.dart';
import './report_store/report_store.dart';
import './team_store/team_store.dart';
import './user_store/user_store.dart';
import './vehicle_store/vehicle_store.dart';

class AppState {
  final CompanyState companyState;
  final DriverState driverState;
  final ReportFormState reportFormState;
  final ReportState reportState;
  final TeamState teamState;
  final UserState userState;
  final VehicleState vehicleState;

  AppState({
    @required this.companyState,
    @required this.driverState,
    @required this.reportFormState,
    @required this.reportState,
    @required this.teamState,
    @required this.userState,
    @required this.vehicleState,
  });

  AppState.initialState()
      : companyState = CompanyState.initialState(),
        driverState = DriverState.initialState(),
        reportFormState = ReportFormState.initialState(),
        reportState = ReportState.initialState(),
        teamState = TeamState.initialState(),
        userState = UserState.initialState(),
        vehicleState = VehicleState.initialState();

  AppState.fromJson(Map json)
      : companyState = CompanyState.fromJson(json['companyState']),
        driverState = DriverState.fromJson(json['driverState']),
        reportFormState = ReportFormState.fromJson(json['reportFormState']),
        reportState = ReportState.fromJson(json['reportState']),
        teamState = TeamState.fromJson(json['teamState']),
        userState = UserState.fromJson(json['userState']),
        vehicleState = VehicleState.fromJson(json['vehicleState']);

  Map toJson() => {
        'companyState': companyState.toJson(),
        'driverState': driverState.toJson(),
        'reportFormState': reportFormState.toJson(),
        'reportState': reportState.toJson(),
        'teamState': teamState.toJson(),
        'userState': userState.toJson(),
        'vehicleState': vehicleState.toJson()
      };
}
