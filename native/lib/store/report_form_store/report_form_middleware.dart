import 'package:logisticsinspect/store/middleware.dart';
import 'package:logisticsinspect/store/store_model.dart';

import './report_form_actions.dart';
import 'package:redux/redux.dart';

void reportFormStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  if (action is AddReportFormAction ||
      action is AddReportFormFieldAction ||
      action is RemoveFormAction ||
      action is UpdateReportFormAction ||
      action is SelectFormAction) {
    saveToPrefs(store.state);
  }

  if (action is GetReportFormAction) {
    await loadFromPrefs().then((state) => store
        .dispatch(LoadedFormAction(state.reportFormState.selectedReportForm)));
  }

  if (action is GetReportFormsAction) {
    await loadFromPrefs().then((state) =>
        store.dispatch(LoadedFormsAction(state.reportFormState.reportForms)));
  }
}
