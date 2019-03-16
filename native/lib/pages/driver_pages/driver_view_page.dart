import 'package:flutter/material.dart';
import 'package:logisticsinspect/widgets/report/report_tile.dart';

class DriverViewPage extends StatelessWidget {
  final String driverId;

  DriverViewPage(this.driverId);

  Widget _buildDriverImage(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: CircleAvatar(
        child: Text('PN', style: TextStyle(fontSize: 50.0)),
        radius: MediaQuery.of(context).size.width / 6,
      ),
    );
  }

  Widget _buildDriverInfo() {
    return Column(
      children: <Widget>[
        Column(
          children: <Widget>[
            Text('Person Name', style: TextStyle(fontSize: 20.0)),
          ],
        ),
        SizedBox(height: 20.0),
        Column(
          children: <Widget>[
            ListTile(
              title: Text('email@gmail.com'),
              subtitle: Text('Email'),
              onTap: () {},
            ),
            ListTile(
              title: Text('1 (102) 232-3233'),
              subtitle: Text('Phone'),
              onTap: () {},
            ),
          ],
        )
      ],
    );
  }

  Widget _buildDriverTeams(BuildContext context) {
    return Column(
      children: <Widget>[
        Text('Teams', style: TextStyle(fontSize: 18.0)),
        SizedBox(height: 10.0),
        Card(
          child: Column(
            children: List.generate(
              2,
              (_) => ListTile(
                    title: Text('Team Name'),
                    subtitle: Text('Team Role'),
                  ),
            )..add(Container(
                padding: EdgeInsets.only(bottom: 10.0),
                child: RaisedButton(
                  child: Text('Add Team'),
                  onPressed: () {
                    // Navigator.pushNamed(context, '/drivers');
                  },
                ),
              )),
          ),
        ),
      ],
    );
  }

  Widget _buildDriverRecentReports(BuildContext context) {
    return Column(
      children: <Widget>[
        Text('Reports', style: TextStyle(fontSize: 18.0)),
        SizedBox(height: 10.0),
        Card(
          child: Column(
            children: List.generate(3, (_) => ReportTile())
              ..add(Container(
                padding: EdgeInsets.only(bottom: 10.0),
                child: RaisedButton(
                  child: Text('See more'),
                  onPressed: () {
                    Navigator.pushNamed(context, '/drivers');
                  },
                ),
              )),
          ),
        ),
      ],
    );
  }

  Widget _buildDriverActionItems() {
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Driver'),
      ),
      body: ListView(
        children: <Widget>[
          _buildDriverImage(context),
          _buildDriverInfo(),
          SizedBox(height: 10.0),
          _buildDriverTeams(context),
          SizedBox(height: 10.0),
          _buildDriverRecentReports(context),
          _buildDriverActionItems(),
        ],
      ),
    );
  }
}
