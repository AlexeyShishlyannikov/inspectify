export interface IVehicle {
    id: number;
    name: string;
    year: number;
    make: IVehicleMake;
    model: IVehicleModel;
    licensePlate: string;
}

export interface IVehicleMake {
    id: number;
    name: string;
    models: IVehicleModel[];
}

export interface IVehicleModel {
    id: number;
    name: string;
    make: IVehicleMake;
}
