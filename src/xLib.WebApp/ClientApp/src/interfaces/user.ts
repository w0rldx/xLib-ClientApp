export interface IUser {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    avatar: string;
    headerPicture: string;
    roles: string[];
}

export interface IUpdateUser {
    firstName: string;
    lastName: string;
    userName: string;
    private: boolean;
}
