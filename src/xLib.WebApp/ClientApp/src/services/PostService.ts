import axios, { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/User';

const apiClient = axios.create({
    baseURL: process.env.WEB_API_URL,
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

const getAllPostFromUser = async (token: string, userName: string) => {};
const getPostById = async (token: string, userName: string) => {};
const deletePostById = async (token: string, userName: string) => {};
const createPost = async (token: string, userName: string) => {};
const updatePost = async (token: string, userName: string) => {};

const PostService = {
    getAllPostFromUser,
    getPostById,
    deletePostById,
    createPost,
    updatePost,
};

export default PostService;
