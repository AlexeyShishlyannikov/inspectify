import 'package:flutter/material.dart';

class ReportEditPage extends StatefulWidget {
  final String reportId;
  
  ReportEditPage(this.reportId);

  @override
  ReportEditPageState createState() {
    return ReportEditPageState(reportId);
  }
}

class ReportEditPageState extends State<ReportEditPage> {
  final String reportId;
  
  ReportEditPageState(this.reportId);

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
