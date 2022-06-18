import axios, { AxiosResponse } from 'axios';
import { ITokenResponse, IUser, IUserLoginForm, IUserRegisterFrom } from '../interfaces/user';

const apiClient = axios.create({
    baseURL: process.env.WEB_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const loginUser = async (userLoginForm: IUserLoginForm): Promise<ITokenResponse> => {
    const response: AxiosResponse<ITokenResponse> = await apiClient.post(
        '/user/loginuser',
        JSON.stringify(userLoginForm),
        {
            headers: { 'Content-type': 'application/json' },
            withCredentials: true,
        }
    );

    return response.data;
};

const registerUser = async (userRegisterForm: IUserRegisterFrom): Promise<ITokenResponse> => {
    const response: AxiosResponse<ITokenResponse> = await apiClient.post(
        '/user/registeruser',
        JSON.stringify(userRegisterForm),
        {
            headers: { 'Content-type': 'application/json' },
            withCredentials: true,
        }
    );

    return response.data;
};

const getUserData = async (token: string): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await apiClient.get('/user/getuser', {
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
    });

    return response.data;
};

const UserService = {
    loginUser,
    registerUser,
    getUserData,
};

export default UserService;
