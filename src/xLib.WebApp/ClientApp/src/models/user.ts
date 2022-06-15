export interface IUserResponse {
    massage: string;
    isAuthenticated: boolean;
    userName: string;
    email: string;
    roles: string[];
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
