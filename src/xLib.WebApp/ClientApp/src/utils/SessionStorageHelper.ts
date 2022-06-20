import { IUser } from 'interfaces/user';

const setUserSessionStorage = (user: IUser) => {
    sessionStorage.setItem('user', JSON.stringify(user));
};

const getUserSessionStorage = () => {
    const result = sessionStorage.getItem('user');
    if (result === null || result === undefined) {
        return null;
    }
    return JSON.parse(result) as IUser;
};

const clearUserSessionStorage = () => {
    sessionStorage.removeItem('user');
};

const setTokenSessionStorage = (token: string) => {
    sessionStorage.setItem('token', token);
};

const getTokenSessionStorage = () => {
    return sessionStorage.getItem('token');
};
const clearTokenSessionStorage = () => {
    sessionStorage.removeItem('token');
};

const clearSessionStorage = () => {
    sessionStorage.clear();
};

const SessionStorageHelper = {
    setUserSessionStorage,
    getUserSessionStorage,
    clearUserSessionStorage,

    setTokenSessionStorage,
    getTokenSessionStorage,
    clearTokenSessionStorage,

    clearSessionStorage,
};

export default SessionStorageHelper;
