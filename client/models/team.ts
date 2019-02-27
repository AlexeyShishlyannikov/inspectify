import { IDriver } from "./driver";

export interface ITeam {
    id: number;
    name: string;
    descrioption: string;
    drivers: IDriver[];
}
