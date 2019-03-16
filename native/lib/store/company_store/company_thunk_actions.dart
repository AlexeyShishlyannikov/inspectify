import 'dart:convert';

import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/models/company.dart';
import 'package:logisticsinspect/store/company_store/company_store.dart';

import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:http/http.dart' as http;

import './company_actions.dart';

ThunkAction<CompanyState> getCompany = (Store<CompanyState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'companies'));
  Company returnedCompany = Company.fromJson(json.decode(response.body));
  store.dispatch(CompanyLoadedAction(company: returnedCompany));
};
