import axios, { AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { getAccessToken, getRefreshToken, resetTokens, setTokens } from '../utils/token';
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const API_BASE_URL = Platform.OS === 'ios' ? 'http://localhost:5500/api/v1' : 'http://10.0.2.2:5500/api/v1';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.url === '/auth/refresh') {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response.data.statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        try {
          const response = await apiClient.post('/auth/refresh');

          await setTokens(response.data.accessToken, response.data.refreshToken);
          return apiClient(originalRequest);
        } catch (error) {
          apiClient.post('/auth/logout').then(() => {
            resetTokens();
          });
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);
export default apiClient;
