import axios from 'axios';
import { initializeStore } from '@redux/store';

const API = axios.create({
    baseURL: `http://15.184.169.230:3003/v1/`,
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
