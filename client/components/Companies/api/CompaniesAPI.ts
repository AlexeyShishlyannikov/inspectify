export namespace CompaniesAPI {
    export const login = async (): Promise<string> => {
        const response = await fetch(
            window.location.origin + '/api/account/login/',
            {
                body: JSON.stringify(login),
                method: 'POST'
            }
        );
        return response.json();
    };
}
