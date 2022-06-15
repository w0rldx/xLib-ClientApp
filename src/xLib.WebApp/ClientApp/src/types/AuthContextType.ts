import { IUserResponse } from '../interfaces/user';

export type AuthContextType = {
    user: IUserResponse | null;
    setUser: (User: IUserResponse) => void;
};
