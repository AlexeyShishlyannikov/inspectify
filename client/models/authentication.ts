let jwtDecode = require('jwt-decode');

export class User {
    readonly userId: string;
    readonly email: string;
    readonly expirationDate: number;
    readonly teamId: string;
    readonly companyId: string;
    readonly isCompany: boolean;

    constructor(token: string) {
        const decodedToken = jwtDecode(token);        
        this.userId = decodedToken.userId;
        this.email = decodedToken.email;
        this.expirationDate = decodedToken.exp;
        this.teamId = decodedToken.teamId;
        this.companyId = decodedToken.companyId;
        this.isCompany = decodedToken.isCompany === 'true';
    }
}