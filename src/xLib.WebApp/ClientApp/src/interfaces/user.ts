export interface ITokenResponse {
    isAuthenticated: boolean;
    token: string;
}

export interface IUserRegisterFrom {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface IUserLoginForm {
    email: string;
    password: string;
}

export interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    roles: string[];
    email: string;
}
