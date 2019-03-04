import { ITeam } from "./Team";

export interface IPerson {
    id: string;
    email: string;
    team?: ITeam;
    firstName: string;
    lastName: string;
}