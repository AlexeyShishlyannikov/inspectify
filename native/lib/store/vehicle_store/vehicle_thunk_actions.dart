import 'dart:convert';

import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/models/vehicle.dart';
import 'package:logisticsinspect/store/vehicle_store/vehicle_store.dart';

import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:http/http.dart' as http;

import './vehicle_actions.dart';

ThunkAction<VehicleState> addVehicle = (Store<VehicleState> store) async {
  Map vehicle = store.state.selectedVehicle.toJson();
  http.Response response = await http.post(
    Uri.encodeFull(apiUrl + 'vehicle/add'),
    body: vehicle,
  );
  Vehicle returnedVehicle = Vehicle.fromJson(json.decode(response.body));
  store.dispatch(LoadedVehiclesAction(
    List.from(store.state.vehicles)..add(returnedVehicle),
  ));
};

ThunkAction<VehicleState> updateVehicle = (Store<VehicleState> store) async {
  Map selectedVehicleJson = store.state.selectedVehicle.toJson();
  http.Response response = await http.put(
    Uri.encodeFull(apiUrl + 'vehicle/update'),
    body: selectedVehicleJson,
  );
  Vehicle returnedVehicle = Vehicle.fromJson(json.decode(response.body));
  List<Vehicle> vehicles = List.from(store.state.vehicles);
  store.dispatch(LoadedVehiclesAction(
    vehicles.map((vehicle) =>
        vehicle.id == returnedVehicle.id ? returnedVehicle : vehicle),
  ));
};

ThunkAction<VehicleState> deleteVehicle = (Store<VehicleState> store) async {
  http.Response response = await http.delete(
    Uri.encodeFull(
        apiUrl + 'vehicle/delete/' + store.state.selectedVehicle.id.toString()),
  );
  String deletedId = json.decode(response.body);
  store.dispatch(SelectVehicleAction(null));
  store.dispatch(LoadedVehiclesAction(
    List.from(store.state.vehicles)
      ..removeWhere((vehicle) => vehicle.id == deletedId),
  ));
};

ThunkAction<VehicleState> getVehicle = (Store<VehicleState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'vehicle/get'));
  Vehicle returnedVehicle = Vehicle.fromJson(json.decode(response.body));
  store.dispatch(SelectVehicleAction(returnedVehicle));
};

ThunkAction<VehicleState> getVehicles = (Store<VehicleState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'vehicle/getVehicles'));
  List<Map> jsonList = json.decode(response.body);
  List<Vehicle> returnedVehicles = jsonList
      .map((vehicleJson) => Vehicle.fromJson(json.decode(response.body)));
  store.dispatch(LoadedVehiclesAction(returnedVehicles));
};

ThunkAction<VehicleState> getMake = (Store<VehicleState> store) async {
  String makeId = store.state.selectedVehicle.make.id;
  http.Response response = await http.get(
    Uri.encodeFull(apiUrl + 'vehicle/make/get?makeId=$makeId'),
  );
  VehicleMake returnedMake = VehicleMake.fromJson(json.decode(response.body));
  // store.dispatch(SelectVehicleAction(returnedMake));
};

ThunkAction<VehicleState> getMakes = (Store<VehicleState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'vehicle/make/getMakes'));
  List<Map> jsonList = json.decode(response.body);
  List<VehicleMake> returnedMakes = jsonList
      .map((makeJson) => VehicleMake.fromJson(json.decode(response.body)));
  // store.dispatch(LoadedVehiclesAction(returnedMakes));
};

ThunkAction<VehicleState> getModel = (Store<VehicleState> store) async {
  String modelId = store.state.selectedVehicle.model.id;
  http.Response response = await http.get(
    Uri.encodeFull(apiUrl + 'vehicle/Model/get?modelId=$modelId'),
  );
  VehicleModel returnedModel = VehicleModel.fromJson(json.decode(response.body));
  // store.dispatch(SelectVehicleAction(returnedModel));
};

ThunkAction<VehicleState> getModels = (Store<VehicleState> store) async {
  http.Response response =
      await http.get(Uri.encodeFull(apiUrl + 'vehicle/model/getModels'));
  List<Map> jsonList = json.decode(response.body);
  List<VehicleModel> returnedModels = jsonList
      .map((modelJson) => VehicleModel.fromJson(json.decode(response.body)));
  // store.dispatch(LoadedVehiclesAction(returnedModels));
};
