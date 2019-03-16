import 'package:flutter/material.dart';
import 'package:logisticsinspect/widgets/drawers/drawer.dart';
import 'package:logisticsinspect/widgets/report_form/report_form_tile.dart';

class ReportFormsPage extends StatelessWidget {
  Widget _buildReportFormTile(BuildContext context) {
    return ReportFormTile(onSelect: () {
      Navigator.pushNamed(context, '/report-forms/edit/' + 1.toString());
    },);
  }

  List<Widget> _getReportFormTiles(BuildContext context) {
    return List.generate(3, (_) => _buildReportFormTile(context));
  }

  List<Widget> _getArchivedReportFormTiles(BuildContext context) {
    return List.generate(1, (_) => _buildReportFormTile(context));
  }

  Widget _buildReportFormsActionItems() {
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Forms'),
      ),
      drawer: AppDrawer(),
      body: ListView(
        children: <Widget>[
          Column(
            children: <Widget>[
              Text(
                'Active Forms',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 10.0),
              Column(children: _getReportFormTiles(context)),
            ],
          ),
          Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.archive),
                  Text(
                    'Archived Forms',
                    style: TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10.0),
              Column(children: _getArchivedReportFormTiles(context)),
            ],
          ),
          _buildReportFormsActionItems(),
        ],
      ),
    );
  }
}
