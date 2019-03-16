import 'package:flutter/foundation.dart';
import 'package:logisticsinspect/models/company.dart';

class GetCompanyAction {
  final String id;

  GetCompanyAction({@required this.id});
}

class CompanyLoadedAction {
  final Company company;

  CompanyLoadedAction({@required this.company});
}

class RemoveCompanyAction {}