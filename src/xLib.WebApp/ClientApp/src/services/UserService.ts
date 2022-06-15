import axios from 'axios';
import { IUserLoginForm, IUserResponse } from '../models/user';

const apiClient = axios.create({
    baseURL: process.env.WEB_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const getUserToken = async (user: IUserLoginForm): Promise<IUserResponse> => {
    const response: IUserResponse = await apiClient.post('/user/token', JSON.stringify(user), {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
    });

    return response;
};

const UserService = {
    getUserToken,
};

export default UserService;
