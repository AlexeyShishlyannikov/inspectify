import 'package:logisticsinspect/models/report_form.dart';
import 'package:logisticsinspect/store/report_form_store/report_form_store.dart';
import './report_form_actions.dart';

ReportFormState reportFormStateReducer(ReportFormState state, action) {
  return ReportFormState(
    selectedReportForm: reportFormReducer(state.selectedReportForm, action),
    reportForms: reportFormsReducer(state.reportForms, action),
  );
}

List<ReportForm> reportFormsReducer(List<ReportForm> reportForms, action) {
  if (action is LoadedFormsAction) {
    return action.reportForms;
  }

  if (action is UpdateReportFormAction) {
    return reportForms
        .map((reportForm) => reportForm.id == action.reportForm.id
            ? action.reportForm
            : reportForm)
        .toList();
  }

  if (action is AddReportFormAction) {
    return reportForms..add(action.reportForm);
  }

  if (action is RemoveFormAction) {
    return reportForms..removeWhere((reportForm) => reportForm.id == action.reportForm.id);
  }

  return reportForms;
}

ReportForm reportFormReducer(ReportForm selectedReportForm, action) {
  if (action is AddReportFormAction) {
    return action.reportForm;
  }

  if (action is LoadedFormAction) {
    return action.reportForm;
  }

  if (action is UpdateReportFormAction) {
    return action.reportForm;
  }

  if (action is RemoveFormAction) {
    return null;
  }

  if (action is AddReportFormFieldAction) {
    return selectedReportForm.copyWith(
        formFields: []
          ..addAll(selectedReportForm.formFields)
          ..add(action.reportFormField));
  }

  if (action is RemoveReportFormFieldAction) {
    return selectedReportForm.copyWith(
        formFields: []
          ..addAll(selectedReportForm.formFields)
          ..remove(action.reportFormField));
  }

  return selectedReportForm;
}
