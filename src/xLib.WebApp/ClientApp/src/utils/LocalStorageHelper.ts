import { IUser } from './../interfaces/user';
const setDarkModeLocalStorage = (colorScheme: string) => {
    if (colorScheme === 'light') {
        localStorage.setItem('colorScheme', 'dark');
    } else {
        localStorage.setItem('colorScheme', 'light');
    }
};

const getDarkModeLocalStorage = () => {
    const result = localStorage.getItem('colorScheme');
    if (result === null || result === undefined) {
        return 'light';
    }

    return result;
};

const getTokenLocalStorage = () => {
    const result = localStorage.getItem('token');
    if (result === null || result === undefined) {
        return null;
    }
    return result;
};

const setTokenLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
};

const clearTokenLocalStorage = () => {
    localStorage.removeItem('token');
};

const getUserLocalStorage = () => {
    const result = localStorage.getItem('user');
    if (result === null || result === undefined) {
        return null;
    }
    return JSON.parse(result) as IUser;
};

const setUserLocalStorage = (user: IUser) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const clearUserLocalStorage = () => {
    localStorage.removeItem('user');
};

const getStaySignedInLocalStorage = () => {
    const result = localStorage.getItem('staySignedIn');
    if (result === null || result === undefined) {
        return null;
    }
    return result;
};

const setStaySignedInLocalStorage = (staySignedIn: boolean) => {
    localStorage.setItem('staySignedIn', staySignedIn.toString());
};

const clearStaySignedInLocalStorage = () => {
    localStorage.removeItem('staySignedIn');
};

const LocalStorageHelper = {
    setDarkModeLocalStorage,
    getDarkModeLocalStorage,

    getTokenLocalStorage,
    setTokenLocalStorage,
    clearTokenLocalStorage,

    setUserLocalStorage,
    getUserLocalStorage,
    clearUserLocalStorage,

    getStaySignedInLocalStorage,
    setStaySignedInLocalStorage,
    clearStaySignedInLocalStorage,
};

export default LocalStorageHelper;
