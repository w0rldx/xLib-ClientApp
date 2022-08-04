import axios, { AxiosResponse } from 'axios';

import { IUpdateUser, IUser } from '../interfaces/User';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_WEB_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const getSpecificUserData = async (token: string, userName: string) => {
    const response: AxiosResponse<IUser> = await apiClient.get(
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

const updateUserData = async (
    token: string,
    user: IUpdateUser,
    avatar: File | null,
    header: File | null,
) => {
    const fd = new FormData();
    if (avatar != null && header != null) {
        console.log('Test Trigger Avatar and Header null');
        fd.append('avatarFile', avatar);
        fd.append('headerFile', header);
        fd.append(
            'model',
            JSON.stringify({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                private: user.private,
            }),
        );
        const response: AxiosResponse<IUser> = await apiClient.put(
            `/user/updateuser`,
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            },
        );
        return response;
    }
    if (avatar != null && header == null) {
        fd.append('avatarFile', avatar);
        fd.append(
            'model',
            JSON.stringify({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                private: user.private,
            }),
        );
        console.log('Test Trigger Avatar null');
        const response: AxiosResponse<IUser> = await apiClient.put(
            `/user/updateuser`,
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            },
        );
        return response;
    } else if (avatar == null && header != null) {
        fd.append('headerFile', header);
        fd.append(
            'model',
            JSON.stringify({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                private: user.private,
            }),
        );
        const response: AxiosResponse<IUser> = await apiClient.put(
            `/user/updateuser`,
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            },
        );
        return response;
    } else {
        fd.append(
            'model',
            JSON.stringify({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                private: user.private,
            }),
        );
        const response: AxiosResponse<IUser> = await apiClient.put(
            `/user/updateuser`,
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            },
        );
        return response;
    }
};

const UserService = {
    getSpecificUserData,
    updateUserData,
};

export default UserService;
