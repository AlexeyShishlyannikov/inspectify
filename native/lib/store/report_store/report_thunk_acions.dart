import 'dart:convert';

import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/models/report.dart';
import 'package:logisticsinspect/store/report_store/report_store.dart';

import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:http/http.dart' as http;

import './report_actions.dart';

ThunkAction<ReportState> updateReport = (Store<ReportState> store) async {
  Map selectedreportJson = store.state.selectedReport.toJson();
  http.Response response = await http.put(
    Uri.encodeFull(apiUrl + 'report/update'),
    body: selectedreportJson,
  );
  Report returnedreport = Report.fromJson(json.decode(response.body));
  List<Report> reports = List.from(store.state.reports);
  store.dispatch(LoadedReportsAction(
    reports.map(
        (report) => report.id == returnedreport.id ? returnedreport : report),
  ));
};

ThunkAction<ReportState> deleteReport = (Store<ReportState> store) async {
  http.Response response = await http.delete(
    Uri.encodeFull(
        apiUrl + 'report/delete/' + store.state.selectedReport.id.toString()),
  );
  int deletedId = json.decode(response.body);
  store.dispatch(SelectReportAction(null));
  store.dispatch(LoadedReportsAction(
    List.from(store.state.reports)
      ..removeWhere((report) => report.id == deletedId),
  ));
};

ThunkAction<ReportState> getReport = (Store<ReportState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'report/get'));
  Report returnedreport = Report.fromJson(json.decode(response.body));
  store.dispatch(SelectReportAction(returnedreport));
};

ThunkAction<ReportState> getReports = (Store<ReportState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'report/getReports'));
  List<Map> jsonList = json.decode(response.body);
  List<Report> returnedreports =
      jsonList.map((reportJson) => Report.fromJson(json.decode(response.body)));
  store.dispatch(LoadedReportsAction(returnedreports));
};
