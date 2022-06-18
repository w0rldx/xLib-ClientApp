import { IUser } from '../interfaces/user';

export type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
};
