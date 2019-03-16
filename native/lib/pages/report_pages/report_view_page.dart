import 'package:flutter/material.dart';
import 'package:logisticsinspect/widgets/report/report_value_tile.dart';

class ReportViewPage extends StatelessWidget {
  final String reportId;
  ReportViewPage(this.reportId);

  List<Widget> _buildReportValueTiles() {
    return List.generate(10, (_) => null).map((reportValue) {
      return ReportValueTile(
        index: 1,
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Report Name'),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: ListView(
              children: _buildReportValueTiles(),
            ),
          )
        ],
      ),
    );
  }
}
