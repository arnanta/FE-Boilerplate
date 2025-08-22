// import apiPublic from "@utils/axios/axios-public-instance";
// import api from "@utils/axios/axios-instance";
const API_URL = '/api/auth';
import axios from 'axios';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    password,
  });
  return response.data;
};
