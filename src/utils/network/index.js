import axios from 'axios';
import url from './apiConfig';


export const api = axios.create({
  timeout: 5000,
  baseURL: url,
});

// add headers
api.interceptors.request.use((req) => {
  if (!req.headers['Content-Type']) {
    req.headers['Content-Type'] = 'application/json';
  }
  req.headers.Accept = 'application/json';
  return req;
});

// SET token on all request
export const addTokenToReq = (token) => {
  if(!token) return
  api.interceptors.request.use((req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });
}
