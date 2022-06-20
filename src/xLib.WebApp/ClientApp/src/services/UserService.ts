import axios, { AxiosResponse } from 'axios';
import { IIdentity } from '../interfaces/Identity';

const apiClient = axios.create({
    baseURL: process.env.WEB_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const getSpecificUserData = async (token: string, userName: string) => {
    const response: AxiosResponse<IIdentity> = await apiClient.get(
        `/user/getuser/${userName}`,
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

const UserService = {
    getSpecificUserData,
};

export default UserService;
