import { jwt_decode } from "jwt-decode";

export class User {
    readonly email: string;
    readonly expirationDate: string;
    readonly teamId: string;
    readonly companyId: string;
    readonly isCompany: boolean;

    constructor(token: string) {
        const decodedToken = jwt_decode(token);
        this.email = decodedToken.email;
        this.expirationDate = decodedToken.expirationDate;
        this.teamId = decodedToken.teamId;
        this.companyId = decodedToken.companyId;
        this.isCompany = decodedToken.isCompany === 'true';
    }
}