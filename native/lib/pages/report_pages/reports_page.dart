import 'package:flutter/material.dart';
import 'package:logisticsinspect/widgets/drawers/drawer.dart';
import 'package:logisticsinspect/widgets/report/report_tile.dart';

class ReportsPage extends StatefulWidget {
  @override
  ReportsPageState createState() {
    return ReportsPageState();
  }
}

class ReportsPageState extends State<ReportsPage> {
  Widget _buildSearchBox() {
    return TextField(
      decoration: InputDecoration(
        prefixIcon: Icon(Icons.search),
        labelText: 'Search',
      ),
      keyboardType: TextInputType.text,
      onChanged: (String input) {},
    );
  }

  Widget _buildOptionsPanel() {
    return Row(
      children: <Widget>[
        Expanded(
          child: FlatButton(
            child: Text('Driver'),
            onPressed: () {},
          ),
        ),
        Expanded(
          child: FlatButton(
            child: Text('Vehicle'),
            onPressed: () {},
          ),
        ),
      ],
    );
  }

  Widget _buildDatePicker() {
    return Row(
      children: <Widget>[
        Expanded(
          child: FlatButton(
            child: Text('From 1st Date - To 2nd Date'),
            onPressed: () async {
              await showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime(DateTime.may),
                lastDate: DateTime.now(),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildReportCard(BuildContext context, int index) {
    return Container(
      padding: EdgeInsets.all(10.0),
      child: ReportTile(
        onSelect: () {
          Navigator.pushNamed(context, '/reports/view/' + index.toString());
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reports'),
      ),
      drawer: AppDrawer(),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
        child: Column(
          children: <Widget>[
            _buildSearchBox(),
            _buildOptionsPanel(),
            _buildDatePicker(),
            Expanded(
              child: ListView.builder(
                itemBuilder: _buildReportCard,
                itemCount: 4,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
