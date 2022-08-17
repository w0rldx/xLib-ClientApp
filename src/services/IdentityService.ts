import axios, { AxiosResponse } from 'axios';

import {
    IIdentity,
    IIdentityLoginForm,
    IIdentityRegisterFrom,
    ITokenResponse,
} from '../interfaces/Identity';

const baseUrl = () => {
    if (import.meta.env.PROD) {
        return window.env.APIURL;
    }
    return import.meta.env.VITE_WEB_API_LOCAL_URL;
};

const apiClient = axios.create({
    baseURL: baseUrl(),
    headers: {
        'Content-type': 'application/json',
    },
});

const loginUser = async (
    userLoginForm: IIdentityLoginForm,
): Promise<ITokenResponse> => {
    const response: AxiosResponse<ITokenResponse> = await apiClient.post(
        '/identity/loginuser',
        JSON.stringify(userLoginForm),
        {
            headers: { 'Content-type': 'application/json' },
            withCredentials: true,
        },
    );

    return response.data;
};

const registerUser = async (
    userRegisterForm: IIdentityRegisterFrom,
): Promise<ITokenResponse> => {
    const response: AxiosResponse<ITokenResponse> = await apiClient.post(
        '/identity/registeruser',
        JSON.stringify(userRegisterForm),
        {
            headers: { 'Content-type': 'application/json' },
            withCredentials: true,
        },
    );

    return response.data;
};

const getUserData = async (token: string): Promise<IIdentity> => {
    const response: AxiosResponse<IIdentity> = await apiClient.get(
        '/identity/getuser',
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        },
    );

    return response.data;
};

const IdentityService = {
    loginUser,
    registerUser,
    getUserData,
};

export default IdentityService;
