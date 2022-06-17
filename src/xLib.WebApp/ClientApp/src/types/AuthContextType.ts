import { ITokenResponse, IUser } from '../interfaces/user';

export type AuthContextType = {
    token: ITokenResponse | null;
    setToken: (token: ITokenResponse) => void;
    user: IUser | null;
    setUser: (user: IUser) => void;
};
