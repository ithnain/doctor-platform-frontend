import axios from "axios";
import { initializeStore } from "@redux/store";

const API = axios.create({
  baseURL: `http://157.175.95.127:3003/v1/`,
  // baseURL: `http://localhost:3003/v1/`,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${initializeStore().getState().user?.token}`,
  },
});

export default API;
