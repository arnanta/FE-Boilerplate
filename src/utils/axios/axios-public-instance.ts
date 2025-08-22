// import type { AxiosError } from "axios";
import { axiosLogger } from '@utils/axios-logger';
import axios from 'axios';

const apiPublic = axios.create({
  baseURL: '/', //have to be relative for public instance
  // baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:500
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiPublic.interceptors.request.use(
  config => {
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

apiPublic.interceptors.response.use(
  response => response,
  (error: unknown) => {
    return axiosLogger(error);
  },
);

export default apiPublic;
