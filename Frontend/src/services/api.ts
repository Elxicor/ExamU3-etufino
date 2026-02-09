import axios from 'axios';

const API_URL = 'https://examu3-backend.vercel.app/api/shoppers';

export const fetchShopperTotal = async (shopperId: string) => {
  const response = await axios.get(`${API_URL}/${shopperId}/shopper_total`);
  return response.data;
};

export const fetchTotalAmount = async () => {
  const response = await axios.get(`${API_URL}/shoppers_total`);
  return response.data;
};