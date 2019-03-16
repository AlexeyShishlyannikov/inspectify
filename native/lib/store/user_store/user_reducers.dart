import 'package:logisticsinspect/models/user.dart';
import 'package:logisticsinspect/store/user_store/user_actions.dart';
import 'package:logisticsinspect/store/user_store/user_store.dart';

UserState userStateReducer(UserState state, action) {
  return UserState(
    user: userReducer(state.user, action),
    isAuthenticated: isAuthenticatedReducer(state.isAuthenticated, action),
    isLoading: isLoadingReducer(state.isLoading, action),
  );
}

User userReducer(User state, action) {
  if (action is LogoutAction) {
    return null;
  }
  if (action is LoadedUserAction) {
    return action.user;
  }
  return state;
}

bool isAuthenticatedReducer(bool state, action) {
  if (action is LoadedUserAction) {
    return true;
  }
  if (action is LogoutAction) {
    return false;
  }
  return state;
}

bool isLoadingReducer(bool state, action) {
  if (action is StartLoadingAction) {
    return true;
  }
  if (action is LoadedUserAction) {
    return false;
  }
  return state;
}
