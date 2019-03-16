import './store_model.dart';
import './actions.dart';

import './vehicle_store/vehicle_reducers.dart';
import './user_store/user_reducers.dart';
import './team_store/team_reducers.dart';
import './report_store/report_reducers.dart';
import './report_form_store/report_form_reducers.dart';
import './driver_store/driver_reducers.dart';
import './company_store/company_reducers.dart';

AppState appStateReducer(AppState state, action) {
  if (action is LoadedFromPreferencesAction) {
    return action.appState;
  }

  return AppState(
    companyState: companyStateReducer(state.companyState, action),
    driverState: driverStateReducer(state.driverState, action),
    reportFormState: reportFormStateReducer(state.reportFormState, action),
    reportState: reportStateReducer(state.reportState, action),
    teamState: teamStateReducer(state.teamState, action),
    userState: userStateReducer(state.userState, action),
    vehicleState: vehicleStateReducer(state.vehicleState, action)
  );
}
