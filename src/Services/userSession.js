export const getSessionUser = () => {
    const user = sessionStorage.getItem('user');
    if (user === 'undefined' || !user) {
        return null;
    }
    return JSON.parse(user);
}

export const getSessionToken = () => {
    const token = sessionStorage.getItem('token')
    if (token === 'undefined' || !token) {
        return null;
    }
    return token;
}

export const setUserSession = (user, token) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
}

export const resetUserSession = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
}