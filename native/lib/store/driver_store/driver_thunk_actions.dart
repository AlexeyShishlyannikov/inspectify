import 'dart:convert';

import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/models/driver.dart';
import 'package:logisticsinspect/store/driver_store/driver_store.dart';

import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:http/http.dart' as http;

import './driver_actions.dart';

ThunkAction<DriverState> updateDriver = (Store<DriverState> store) async {
  Map selecteddriverJson = store.state.selectedDriver.toJson();
  http.Response response = await http.put(
    Uri.encodeFull(apiUrl + 'driver/update'),
    body: selecteddriverJson,
  );
  Driver returnedDriver = Driver.fromJson(json.decode(response.body));
  List<Driver> drivers = List.from(store.state.drivers);
  store.dispatch(LoadedDriversAction(
    drivers.map(
        (driver) => driver.id == returnedDriver.id ? returnedDriver : driver),
  ));
};

ThunkAction<DriverState> deleteDriver = (Store<DriverState> store) async {
  http.Response response = await http.delete(
    Uri.encodeFull(
        apiUrl + 'driver/delete/' + store.state.selectedDriver.id.toString()),
  );
  int deletedId = json.decode(response.body);
  store.dispatch(SelectDriverAction(null));
  store.dispatch(LoadedDriversAction(
    List.from(store.state.drivers)
      ..removeWhere((driver) => driver.id == deletedId),
  ));
};

ThunkAction<DriverState> getDriver = (Store<DriverState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'driver/get'));
  Driver returnedDriver = Driver.fromJson(json.decode(response.body));
  store.dispatch(SelectDriverAction(returnedDriver));
};

ThunkAction<DriverState> getDrivers = (Store<DriverState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'driver/getdrivers'));
  List<Map> jsonList = json.decode(response.body);
  List<Driver> returnedDrivers =
      jsonList.map((driverJson) => Driver.fromJson(json.decode(response.body)));
  store.dispatch(LoadedDriversAction(returnedDrivers));
};
