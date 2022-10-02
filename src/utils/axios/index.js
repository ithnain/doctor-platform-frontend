import axios from 'axios';

const API = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_APP_ENV === 'production'
            ? 'https://doctorsapi.ithnain.com/v1/'
            : 'http://172.31.42.233:3003/v1/',
    timeout: 30000
});

API.interceptors.request.use(
    (config) => {
        console.log(process.env.APP_ENV)
        if (config.url === 'auth/signin') return config;
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
