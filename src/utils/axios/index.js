import axios from "axios";
import store from "@redux/store";

const API = axios.create({
  baseURL: `http://localhost:3003/v1/`,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${store.getState().user?.token}`,
  },
});

export default API;
