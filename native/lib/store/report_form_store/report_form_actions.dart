import '../../models/report_form.dart';

class AddReportFormAction {
  final ReportForm reportForm;
  AddReportFormAction(this.reportForm);
}

class RemoveFormAction {
  final ReportForm reportForm;
  RemoveFormAction(this.reportForm);
}

class GetReportFormsAction {
  final String teamId;
  GetReportFormsAction(this.teamId);
}

class GetReportFormAction {
  final String reportFormId;
  GetReportFormAction(this.reportFormId);
}

class LoadedFormAction {
  final ReportForm reportForm;
  LoadedFormAction(this.reportForm);
}

class LoadedFormsAction {
  final List<ReportForm> reportForms;
  LoadedFormsAction(this.reportForms);
}

class SelectFormAction {
  final ReportForm reportForm;
  SelectFormAction(this.reportForm);
}

class UpdateReportFormAction {
  final ReportForm reportForm;
  UpdateReportFormAction(this.reportForm);
}

class AddReportFormFieldAction {
  final ReportFormField reportFormField;
  AddReportFormFieldAction(this.reportFormField);
}

class RemoveReportFormFieldAction {
  final ReportFormField reportFormField;
  RemoveReportFormFieldAction(this.reportFormField);
}
