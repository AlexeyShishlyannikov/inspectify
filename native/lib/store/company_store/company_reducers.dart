import 'package:logisticsinspect/models/company.dart';
import 'package:logisticsinspect/store/company_store/company_actions.dart';
import 'package:logisticsinspect/store/company_store/company_store.dart';

CompanyState companyStateReducer(CompanyState state, action) {
  return CompanyState(
    company: companyReducter(state.company, action),
  );
}

Company companyReducter(Company state, action) {
  if (action is CompanyLoadedAction) {
    return action.company;
  }

  if (action is RemoveCompanyAction) {
    return null;
  }

  return state;
}
