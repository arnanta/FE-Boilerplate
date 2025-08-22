// import axios from "axios";
import apiClient from '@utils/axios/axios-instance';
const API_URL = 'api/payments';

export const createPayment = async (amount: number, description: string) => {
  const response = await apiClient.post(API_URL, {
    amount,
    description,
  });
  return response.data;
};

export const getPayments = async () => {
  const response = await apiClient.get(API_URL);
  return response.data;
};
