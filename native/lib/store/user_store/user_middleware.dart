import 'package:logisticsinspect/store/middleware.dart';
import 'package:redux/redux.dart';
import 'package:logisticsinspect/store/store_model.dart';
import './user_actions.dart';

void userStateMiddleware(
    Store<AppState> store, action, NextDispatcher next) async {
  next(action);

  if (action is LoadedUserAction || action is LogoutAction) {
    saveToPrefs(store.state);
  }
}
