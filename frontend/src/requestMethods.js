import axios from 'axios';
import { toast } from 'react-toastify';

const publicRequest = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

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
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export { publicRequest };