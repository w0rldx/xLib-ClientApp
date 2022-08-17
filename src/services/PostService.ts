import axios, { AxiosResponse } from 'axios';

import { IPost } from '../interfaces/Post';

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

const getAllPostFromUser = async (token: string, userName: string) => {
    const response: AxiosResponse<IPost[]> = await apiClient.get(
        `/post/getallpostfromuser/${userName}`,
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

const getPostById = async (token: string, id: string) => {
    const response: AxiosResponse<IPost> = await apiClient.get(
        `/post/getpostbyid/${id}`,
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

const deletePostById = async (token: string, id: string) => {
    const response: AxiosResponse = await apiClient.delete(
        `/post/deletepost/${id}`,
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

const createPost = async (token: string, message: string) => {
    const response: AxiosResponse<IPost> = await apiClient.post(
        `/post/addnewpost`,
        {
            message: `${message}`,
        },
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

const updatePost = async (token: string, id: string, message: string) => {
    const response: AxiosResponse<IPost> = await apiClient.put(
        `/post/updatepost`,
        {
            id: `${id}`,
            message: `${message}`,
        },
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

const PostService = {
    getAllPostFromUser,
    getPostById,
    deletePostById,
    createPost,
    updatePost,
};

export default PostService;
