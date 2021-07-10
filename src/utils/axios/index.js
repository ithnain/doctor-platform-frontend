import axios from 'axios';
import { initializeStore } from '@redux/store';

const API = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'http://157.175.95.127:3000/v1/'
            : `http://157.175.95.127:3003/v1/`,
    timeout: 30000
});

API.interceptors.request.use(
    (config) => {
        if (initializeStore().getState().user?.accessToken) {
            config.headers.Authorization = `Bearer ${
                initializeStore().getState().user?.accessToken
            }`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default API;
