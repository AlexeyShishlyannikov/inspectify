export interface IVehicle {
    id: number;
    name: string;
    model: IVehicleModel;
    year: number;
    licensePlate: string;
    VIN: string;
}

export interface IVehicleMark {
    id: number;
    name: string;
    model: IVehicleModel;
}

export interface IVehicleModel {
    id: number;
    name: string;
}
