import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiBase = 'https://clienttrust-backend.onrender.com/api/v1'; // TODO: Update to physical device IP or environment variable for mobile

export const api = axios.create({
  baseURL: apiBase,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      // On mobile, navigation is usually handled at the component level or via expo-router router object
    }
    return Promise.reject(error);
  }
);
