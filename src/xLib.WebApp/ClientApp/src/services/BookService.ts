import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.WEB_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const getAll = async () => {
    const response = await apiClient.get('book');
    return response.data;
};

const getById = async (id: string) => {
    const response = await apiClient.get(`book/${id}`);
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
