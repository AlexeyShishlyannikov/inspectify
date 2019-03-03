import { IVehicle } from "./Vehicle";
import { IPerson } from "./person";

export interface IReport {
    id: string;
    name: string;
    vehicle: IVehicle;
    person: IPerson;
    reportFormId: string;
    dateCreated: Date;
    dateUpdated: Date;
}
