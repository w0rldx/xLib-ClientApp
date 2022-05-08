import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.WEB_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const get = async () => {
    console.log(apiClient.getUri());

    const response = await apiClient.get('navigation');
    return response.data;
};

const NavigationService = {
    get,
};

export default NavigationService;
