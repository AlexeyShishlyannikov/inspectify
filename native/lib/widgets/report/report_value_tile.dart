import 'package:flutter/material.dart';

class ReportValueTile extends StatelessWidget {
  final int index;
  ReportValueTile({
    @required this.index,
  });

  Widget _buildReportValueImage(int index) {
    return CircleAvatar(
      child: Text(index.toString()),
    );
  }

  Widget _buildReportValueCardTitle() {
    return Container(
      child: Text('Report Input Name'),
    );
  }

  Widget _buildReportValueStatsText() {
    return Text('V');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
          leading: _buildReportValueImage(index),
          title: _buildReportValueCardTitle(),
          trailing: _buildReportValueStatsText(),
        ),
        Divider(),
      ],
    );
  }
}
