import 'package:logisticsinspect/models/report.dart';
import 'package:logisticsinspect/store/report_store/report_store.dart';
import './report_actions.dart';

ReportState reportStateReducer(ReportState state, action) {
  return ReportState(
    reports: reportsReducer(state.reports, action),
    selectedReport: selectedReportReducer(state.selectedReport, action),
  );
}

Report selectedReportReducer(Report selectedReport, action) {
  if (action is SelectReportAction) {
    return action.report;
  }
  if (action is UpdateReportAction) {
    return selectedReport.id == action.report.id
        ? action.report
        : selectedReport;
  }

  return selectedReport;
}

List<Report> reportsReducer(List<Report> reports, action) {
  if (action is AddReportAction) {
    return []
      ..addAll(reports)
      ..add(action.report);
  }
  if (action is LoadedReportsAction) {
    return []..addAll(action.reports);
  }
  if (action is UpdateReportAction) {
    return []
      ..addAll(reports)
      ..removeAt(reports.indexWhere((report) => report.id == action.report.id))
      ..add(action.report);
  }

  return reports;
}
