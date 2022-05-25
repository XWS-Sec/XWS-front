export const passwordlessLogin = async (email: string) => {
    const url: string = '/api/login/token'

    const response = await fetch(url + `?email=${email}`,{
        method: 'GET'
    });

    return response;
}

export const getPasswordlessUser =async () => {
    const url: string = '/api/User'

    const response = await fetch(url,{
        method: 'GET'
    })

    return response;
}