export const createAuthClientOptions = (token) => {
    return {
        headers: {
            authorization: `bearer ${token}`
        }
    }
}