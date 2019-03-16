import 'package:flutter/foundation.dart';
import 'package:logisticsinspect/models/company.dart';

class CompanyState {
  final Company company;

  CompanyState({
    @required this.company,
  });

  CompanyState.initialState() : company = null;

  CompanyState.fromJson(Map json)
      : company = Company.fromJson(json);

  Map toJson() => {'company': company.toString()};
}
