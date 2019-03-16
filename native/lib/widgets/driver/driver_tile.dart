import 'package:flutter/material.dart';

class DriverTile extends StatelessWidget {
  final void Function() onSelect;
  final String driverId;

  DriverTile({
    this.onSelect,
    this.driverId,
  });

  Widget _buildDriverImage() {
    return CircleAvatar(
      child: Icon(Icons.person),
    );
  }

  Widget _buildDriverCardTitle() {
    return Container(
      child: Text('Person Name'),
    );
  }

  Widget _buildDriverStatsText() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text('Phone Number'),
        Text('Email'),
      ],
    );
  }

  Widget _buildSelectButton() {
    return Icon(Icons.chevron_right);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
          leading: _buildDriverImage(),
          title: _buildDriverCardTitle(),
          subtitle: _buildDriverStatsText(),
          trailing: _buildSelectButton(),
          onTap: onSelect,
        ),
        Divider(),
      ],
    );
  }
}
