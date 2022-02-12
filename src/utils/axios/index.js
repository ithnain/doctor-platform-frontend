import axios from 'axios';

const API = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_APP_ENV === 'production'
            ? 'https://doctorsapi.ithnain.com/v1/'
            : 'https://doctorsapi.ithnain.com/v1/',
    timeout: 30000
});
        // : 'http://doctor-api-load-balancer-1831372393.me-south-1.elb.amazonaws.com:3003/v1/',

API.interceptors.request.use(
    (config) => {
        return fetch('/api/auth/getToken')
            .then((res) => res.json())
            .then((data) => {
                config.headers.Authorization = `Bearer ${data.token}`;
            })
            .then(() => config);
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default API;
