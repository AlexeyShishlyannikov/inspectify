import 'package:flutter/material.dart';
import 'package:logisticsinspect/widgets/drawers/drawer.dart';

class DashboardPage extends StatelessWidget {
  Widget _buildTeamsDashboardTile(BuildContext context) {
    return FlatButton(
      child: Text('To Teams'),
      onPressed: () {
        Navigator.pushReplacementNamed(context, '/teams');
      },
    );
  }

  Widget _buildVehiclesDashboardTile(BuildContext context) {
    return FlatButton(
      child: Text('To Vehicles'),
      onPressed: () {
        Navigator.pushReplacementNamed(context, '/vehicles');
      },
    );
  }

  Widget _buildDriversDashboardTile(BuildContext context) {
    return FlatButton(
      child: Text('To Drivers'),
      onPressed: () {
        Navigator.pushReplacementNamed(context, '/drivers');
      },
    );
  }

  Widget _buildReportDashboardTile(BuildContext context) {
    return FlatButton(
      child: Text('To Reports'),
      onPressed: () {
        Navigator.pushReplacementNamed(context, '/reports');
      },
    );
  }

  Widget _buildReportFormsDashboardTile(BuildContext context) {
    return FlatButton(
      child: Text('To Report Forms'),
      onPressed: () {
        Navigator.pushReplacementNamed(context, '/report-forms');
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
      ),
      drawer: AppDrawer(),
      body: ListView(
        children: <Widget>[
          _buildTeamsDashboardTile(context),
          _buildVehiclesDashboardTile(context),
          _buildDriversDashboardTile(context),
          _buildReportDashboardTile(context),
          _buildReportFormsDashboardTile(context),
        ],
      ),
    );
  }
}
