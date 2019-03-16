import 'package:flutter/material.dart';

class VehicleViewPage extends StatelessWidget {
  final String vehicleId;
  VehicleViewPage(this.vehicleId);

  Widget _buildVehicleImage() {
    return Image.asset('assets/van.jpg');
  }

  Widget _buildVehicleInfo() {
    return Column(
      children: <Widget>[
        Align(
          alignment: Alignment.centerLeft,
          child: Text(
            'Vehicle name',
            style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(height: 10.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Text('Make: Make name'),
            Text('Model: Model name'),
          ],
        ),
        SizedBox(height: 10.0),
        Align(
          alignment: Alignment.centerLeft,
          child: Text('Year: Year'),
        ),
        SizedBox(height: 10.0),
        Align(
          alignment: Alignment.centerLeft,
          child: Text('VIN: VIN number'),
        ),
      ],
    );
  }

  Widget _buildReportsTile(BuildContext context) {
    return Column(
      children: <Widget>[
        Text(
          'Reports',
          style: TextStyle(fontSize: 16.0),
        ),
        Card(
          child: Row(
            children: <Widget>[
              Column(
                children: <Widget>[
                  Text('## Reports'),
                  SizedBox(height: 15),
                  Text('Last report: Yesterday'),
                ],
              ),
              RaisedButton(
                child: Text('See Reports'),
                onPressed: () {
                  Navigator.pushNamed(context, '/reports');
                },
              )
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildVehicleActionItems() {
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Vehicle name'),
      ),
      body: ListView(
        children: <Widget>[
          _buildVehicleImage(),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 32.0),
            child: Column(
              children: <Widget>[
                _buildVehicleInfo(),
                SizedBox(height: 10.0),
                _buildReportsTile(context),
                _buildVehicleActionItems(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
