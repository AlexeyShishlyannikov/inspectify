import { IVehicle } from "./Vehicle";
import { IDriver } from "./driver";

export interface IReport {
    id: string;
    name: string;
    vehicle: IVehicle;
    driver: IDriver;
    reportFormId: string;
    dateCreated: Date;
    dateUpdated: Date;
}
