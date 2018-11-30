export interface IReport {
    id?: number;
    name: string;
    vehicleId: number;
    personId: number;
    teamId: number;
    reportFormId: number;
    dateCreated: Date;
    rate: number;
}
