import 'package:logisticsinspect/models/report.dart';

class AddReportAction {
  final Report report;

  AddReportAction(this.report);
}

class GetReportsAction {
  final int teamId;
  final int vehicleId;
  final int companyId;

  GetReportsAction({
    this.teamId,
    this.vehicleId,
    this.companyId,
  });
}

class LoadedReportsAction {
  final List<Report> reports;

  LoadedReportsAction(this.reports);
}

class SelectReportAction {
  final Report report;

  SelectReportAction(this.report);
}

class UpdateReportAction {
  final Report report;

  UpdateReportAction(this.report);
}