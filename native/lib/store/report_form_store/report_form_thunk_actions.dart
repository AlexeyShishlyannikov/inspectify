import 'dart:convert';

import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/models/report_form.dart';
import 'package:logisticsinspect/store/report_form_store/report_form_store.dart';

import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:http/http.dart' as http;

import './report_form_actions.dart';

ThunkAction<ReportFormState> addReportForm = (Store<ReportFormState> store) async {
  Map selectedreportFormJson = store.state.selectedReportForm.toJson();
  http.Response response = await http.post(
    Uri.encodeFull(apiUrl + 'form/add'),
    body: selectedreportFormJson,
  );
  ReportForm returnedReportForm = ReportForm.fromJson(json.decode(response.body));
  List<ReportForm> reportForms = List.from(store.state.reportForms);
  store.dispatch(LoadedFormsAction(
    reportForms.map(
        (reportForm) => reportForm.id == returnedReportForm.id ? returnedReportForm : reportForm),
  ));
};

ThunkAction<ReportFormState> updateReportForm = (Store<ReportFormState> store) async {
  Map selectedreportFormJson = store.state.selectedReportForm.toJson();
  http.Response response = await http.put(
    Uri.encodeFull(apiUrl + 'form/update'),
    body: selectedreportFormJson,
  );
  ReportForm returnedReportForm = ReportForm.fromJson(json.decode(response.body));
  List<ReportForm> reportForms = List.from(store.state.reportForms);
  store.dispatch(LoadedFormsAction(
    reportForms.map(
        (reportForm) => reportForm.id == returnedReportForm.id ? returnedReportForm : reportForm),
  ));
};

ThunkAction<ReportFormState> deleteReportForm = (Store<ReportFormState> store) async {
  http.Response response = await http.delete(
    Uri.encodeFull(
        apiUrl + 'form/delete/' + store.state.selectedReportForm.id.toString()),
  );
  String deletedId = json.decode(response.body);
  store.dispatch(SelectFormAction(null));
  store.dispatch(LoadedFormsAction(
    List.from(store.state.reportForms)
      ..removeWhere((reportForm) => reportForm.id == deletedId),
  ));
};

ThunkAction<ReportFormState> getReportForm = (Store<ReportFormState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'form/get'));
  ReportForm returnedreportForm = ReportForm.fromJson(json.decode(response.body));
  store.dispatch(SelectFormAction(returnedreportForm));
};

ThunkAction<ReportFormState> getReportForms = (Store<ReportFormState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'form/getreportForms'));
  List<Map> jsonList = json.decode(response.body);
  List<ReportForm> returnedreportForms =
      jsonList.map((reportFormJson) => ReportForm.fromJson(json.decode(response.body)));
  store.dispatch(LoadedFormsAction(returnedreportForms));
};
