import 'package:flutter/material.dart';

class VehicleTile extends StatelessWidget {
  final String vehicleId;
  final void Function() onSelected;
  
  VehicleTile({
    this.vehicleId,
    this.onSelected,
  });

  Widget _buildVehicleImage() {
    return CircleAvatar(
      child: Icon(Icons.drive_eta),
    );
  }

  Widget _buildVehicleCardTitle() {
    return Container(
      child: Text('Vehicle Name'),
    );
  }

  Widget _buildVehicleStatsText() {
    return Text('Vehicle Description');
  }

  Widget _buildSelectButton() {
    return Icon(Icons.chevron_right);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
          leading: _buildVehicleImage(),
          title: _buildVehicleCardTitle(),
          subtitle: _buildVehicleStatsText(),
          trailing: _buildSelectButton(),
          onTap: onSelected,
        ),
        Divider(),
      ],
    );
  }
}
