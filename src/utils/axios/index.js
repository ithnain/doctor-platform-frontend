import axios from "axios";
import { initializeStore } from "@redux/store";

const IsTestServerAcive = true;
const useFakeAuthorization = true;

const baseURL = IsTestServerAcive
  ? "http://localhost:3003/v1/"
  : `https://157.175.95.127:3003/v1/`;

const Authorization = useFakeAuthorization
  ? "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmZjk4NWZiLThhNTEtNDNlMS04MzQyLTFjYzcxYTYxOTJmNSIsImNyZWF0ZWRfYXQiOiIyMDIxLTA2LTMwVDEyOjI2OjA1LjAyNFoiLCJpYXQiOjE2MjUwNjY4ODcsImV4cCI6MTYyNTIzOTY4N30.MNgykhCRf8GMv1INhJ8kMUlKOhUUipEABUdb3Ngiplo"
  : `Bearer ${initializeStore().getState().user?.token}`;

const API = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    Authorization,
  },
});

export default API;
