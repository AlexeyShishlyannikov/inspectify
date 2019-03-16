import 'package:logisticsinspect/store/middleware.dart';
import 'package:logisticsinspect/store/store_model.dart';
import 'package:redux/redux.dart';

import './company_actions.dart';

void companyStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  if (action is RemoveCompanyAction) {
    return saveToPrefs(store.state);
  }

  if (action is GetCompanyAction) {
    await loadFromPrefs().then((state) => store
        .dispatch(CompanyLoadedAction(company: state.companyState.company)));
  }
}
