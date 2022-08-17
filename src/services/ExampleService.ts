import axios from 'axios';

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

const getAll = async () => {
    const response = await apiClient.get('example');
    return response.data;
};

const getById = async (id: string) => {
    const response = await apiClient.get(`example/${id}`);
    return response.data;
};

const create = async () => {};
const update = async () => {};
const deleteById = async () => {};

const BookService = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};

export default BookService;
