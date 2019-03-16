import 'package:flutter/material.dart';
import 'package:logisticsinspect/widgets/driver/driver_tile.dart';
import 'package:logisticsinspect/widgets/report/report_tile.dart';
import 'package:logisticsinspect/widgets/report_form/report_form_tile.dart';
import 'package:logisticsinspect/widgets/vehicle/vehicle_tile.dart';

class TeamViewPage extends StatelessWidget {
  final String teamId;
  TeamViewPage(this.teamId);

  Widget _buildTeamModelSection() {
    return Column(
      children: <Widget>[
        Text(
          'Team name',
          style: TextStyle(
            fontSize: 22.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text('Description'),
      ],
    );
  }

  Widget _buildPeopleSection(BuildContext context) {
    return Column(
      children: <Widget>[
        Text(
          'Drivers',
          style: TextStyle(fontSize: 18.0),
        ),
        Card(
          margin: EdgeInsets.all(10.0),
          child: Container(
            margin: EdgeInsets.only(top: 10.0, bottom: 10.0),
            child: Column(
              children: List.generate(
                3,
                (int index) => DriverTile(),
              )..add(
                  FlatButton(
                    child: Text('See More'),
                    onPressed: () {
                      Navigator.pushNamed(context, '/drivers');
                    },
                  ),
                ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTeamReportsSection(BuildContext context) {
    return Column(
      children: <Widget>[
        Text(
          'Report',
          style: TextStyle(fontSize: 18.0),
        ),
        Card(
          margin: EdgeInsets.all(10.0),
          child: Container(
            margin: EdgeInsets.only(top: 10.0, bottom: 10.0),
            child: Column(
              children: List.generate(
                3,
                (int index) => ReportTile(),
              )..add(
                  FlatButton(
                    child: Text('See More'),
                    onPressed: () {
                      Navigator.pushNamed(context, '/reports');
                    },
                  ),
                ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTeamVehiclesSection(BuildContext context) {
    return Column(
      children: <Widget>[
        Text(
          'Vehicles',
          style: TextStyle(fontSize: 18.0),
        ),
        Card(
          margin: EdgeInsets.all(10.0),
          child: Container(
            margin: EdgeInsets.only(top: 10.0, bottom: 10.0),
            child: Column(
              children: List.generate(
                3,
                (int index) => VehicleTile(),
              )..add(
                  FlatButton(
                    child: Text('See More'),
                    onPressed: () {
                      Navigator.pushNamed(context, '/vehicles');
                    },
                  ),
                ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildReportFormSection(BuildContext context) {
    return Column(
      children: <Widget>[
        Text(
          'Forms',
          style: TextStyle(fontSize: 18.0),
        ),
        Card(
          margin: EdgeInsets.all(10.0),
          child: Container(
            margin: EdgeInsets.only(top: 10.0, bottom: 10.0),
            child: Column(
              children: List.generate(
                3,
                (int index) => ReportFormTile(),
              )..add(
                  FlatButton(
                    child: Text('See More'),
                    onPressed: () {
                      Navigator.pushNamed(context, '/report-forms');
                    },
                  ),
                ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTeamActionItems() {
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Team Name'),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: ListView(
              children: <Widget>[
                Container(
                  padding: EdgeInsets.only(top: 32.0, bottom: 10.0),
                  child: _buildTeamModelSection(),
                ),
                SizedBox(height: 10.0),
                _buildPeopleSection(context),
                SizedBox(height: 10.0),
                _buildTeamVehiclesSection(context),
                SizedBox(height: 10.0),
                _buildTeamReportsSection(context),
                SizedBox(height: 10.0),
                _buildReportFormSection(context),
              ],
            ),
          ),
          _buildTeamActionItems(),
        ],
      ),
    );
  }
}
