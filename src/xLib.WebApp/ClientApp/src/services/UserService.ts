import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.WEB_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const getUserToken = async (email: string, password: string) => {
    const response = await apiClient.post('/user/token', JSON.stringify({ email, password }), {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
    });

    return response.data;
};

const UserService = {
    getUserToken,
};

export default UserService;
