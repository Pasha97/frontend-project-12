const TOKEN_KEY = 'auth_token';
const USERNAME_KEY = 'username';

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isAuthenticated = () => {
    return Boolean(getToken());
}

export const getUserName = () => {
    return localStorage.getItem(USERNAME_KEY);
}

export const setUserName = (name) => {
    localStorage.setItem(USERNAME_KEY, name);
}

export const removeUserName = () => {
    localStorage.removeItem(USERNAME_KEY);
}
