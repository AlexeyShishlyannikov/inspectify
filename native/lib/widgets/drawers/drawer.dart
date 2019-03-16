import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:logisticsinspect/store/store_model.dart';
import 'package:logisticsinspect/store/user_store/user_actions.dart';
import 'package:redux/redux.dart';

class AppDrawer extends StatelessWidget {
  Widget _buildAppBar(_DrawerViewModel viewModel) {
    return AppBar(
      leading: CircleAvatar(child: Text(viewModel.userEmail.substring(0, 1))),
      title: Text(viewModel.userEmail),
    );
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _DrawerViewModel>(
      converter: (store) => _DrawerViewModel(store),
      builder: (_, viewModel) {
        return Drawer(
          child: Column(
            children: <Widget>[
              _buildAppBar(viewModel),
              ListTile(
                leading: Icon(Icons.dashboard),
                title: Text('Dashboard'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/dashboard');
                },
              ),
              ListTile(
                leading: Icon(Icons.format_list_numbered),
                title: Text('Forms'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/report-forms');
                },
              ),
              ListTile(
                leading: Icon(Icons.receipt),
                title: Text('Reports'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/reports');
                },
              ),
              ListTile(
                leading: Icon(Icons.group_work),
                title: Text('Teams'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/teams');
                },
              ),
              ListTile(
                leading: Icon(Icons.people),
                title: Text('Drivers'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/drivers');
                },
              ),
              ListTile(
                leading: Icon(Icons.directions_car),
                title: Text('Vehicles'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/vehicles');
                },
              ),
              Expanded(child: Container()),
              ListTile(
                leading: Icon(Icons.group_add),
                title: Text('Invite driver'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/drivers/invite');
                },
              ),
              ListTile(
                leading: Icon(Icons.settings),
                title: Text('Company'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/company');
                },
              ),
              ListTile(
                leading: Icon(Icons.exit_to_app),
                title: Text('Logout'),
                onTap: () {
                  viewModel.logout();
                  Navigator.pushReplacementNamed(context, '/auth/login');
                },
              ),
            ],
          ),
        );
      },
    );
  }
}

class _DrawerViewModel {
  final Store<AppState> store;
  _DrawerViewModel(this.store);

  String get userEmail => store.state.userState.user != null
      ? store.state.userState.user.email
      : null;
  void logout() => store.dispatch(LogoutAction());
}
