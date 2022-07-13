export interface ITokenResponse {
    isAuthenticated: boolean;
    token: string;
}

export interface IIdentityRegisterFrom {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface IIdentityLoginForm {
    email: string;
    password: string;
}

export interface IIdentity {
    firstName: string;
    lastName: string;
    username: string;
    roles: string[];
    email: string;
    private: boolean;
    profilePicture: string;
}
