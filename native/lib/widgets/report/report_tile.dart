import 'package:flutter/material.dart';

class ReportTile extends StatelessWidget {
  final String reportId;
  final void Function() onSelect;

  ReportTile({
    this.reportId,
    this.onSelect,
  });

  Widget _buildReportImage() {
    return CircleAvatar(
      child: Icon(Icons.receipt),
    );
  }

  Widget _buildReportCardTitle() {
    return Container(
      child: Text('Vehicle Name by Person Name'),
    );
  }

  Widget _buildReportStatsText() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text('Date Created: ' + DateTime.now().toString()),
        Text('Date Updated: ' + DateTime.now().toString()),
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
          leading: _buildReportImage(),
          title: _buildReportCardTitle(),
          subtitle: _buildReportStatsText(),
          trailing: _buildSelectButton(),
          onTap: onSelect,
        ),
        Divider(),
      ],
    );
  }
}
