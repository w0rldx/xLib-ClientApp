import create from 'zustand';
import { IUser } from '../interfaces/user';
import LocalStorageHelper from '../utils/LocalStorageHelper';
import SessionStorageHelper from '../utils/SessionStorageHelper';

export interface AuthStore {
    user: IUser | null;
    getUser: () => IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;

    token: string | null;
    getToken: () => string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    getUser: () => {
        const user: IUser | null = get().user;
        if (user != null) {
            return user;
        }

        const staySignIn = LocalStorageHelper.getStaySignedInLocalStorage();
        if (staySignIn === 'true') {
            const userLocalStorage = LocalStorageHelper.getUserLocalStorage();
            return userLocalStorage;
        } else if (staySignIn === 'false') {
            const userSessionStorage =
                SessionStorageHelper.getUserSessionStorage();
            return userSessionStorage;
        }
        return null;
    },
    setUser: (user: IUser) => {
        set({ user });
        const staySignIn = LocalStorageHelper.getStaySignedInLocalStorage();
        if (staySignIn === 'true') {
            LocalStorageHelper.setUserLocalStorage(user);
        } else {
            SessionStorageHelper.setUserSessionStorage(user);
        }
    },
    clearUser: () => {
        set({ user: null });
        LocalStorageHelper.clearUserLocalStorage();
        SessionStorageHelper.clearUserSessionStorage();
    },

    token: null,
    getToken: () => {
        const token: string | null = get().token;
        if (token != null) {
            return token;
        }
        const staySignIn = LocalStorageHelper.getStaySignedInLocalStorage();
        if (staySignIn === 'true') {
            const tokenLocalStorage = LocalStorageHelper.getTokenLocalStorage();
            return tokenLocalStorage;
        } else if (staySignIn === 'false') {
            const tokenSessionStorage =
                SessionStorageHelper.getTokenSessionStorage();
            return tokenSessionStorage;
        }
        return null;
    },
    setToken: (token: string) => {
        set({ token });
        const staySignIn = LocalStorageHelper.getStaySignedInLocalStorage();
        if (staySignIn === 'true') {
            LocalStorageHelper.setTokenLocalStorage(token);
        } else {
            SessionStorageHelper.setTokenSessionStorage(token);
        }
    },
    clearToken: () => {
        set({ token: null });
        LocalStorageHelper.clearTokenLocalStorage();
        SessionStorageHelper.clearTokenSessionStorage();
    },
}));
