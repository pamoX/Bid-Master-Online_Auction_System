import axios from 'axios';
import { toast } from 'react-toastify';

const publicRequest = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
publicRequest.interceptors.request.use(
    (config) => {
        // You can add any request preprocessing here
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
publicRequest.interceptors.response.use(
    (response) => {
        // Handle successful response
        if (response.data.message) {
            toast.success(response.data.message);
        }
        return response;
    },
    (error) => {
        // Handle error response
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
        console.error('API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return Promise.reject(error);
    }
);

export { publicRequest };