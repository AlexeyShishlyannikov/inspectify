import 'package:logisticsinspect/store/store_model.dart';

class LoadFromPreferencesAction {}

class LoadedFromPreferencesAction {
  final AppState appState;

  LoadedFromPreferencesAction(this.appState);
}
