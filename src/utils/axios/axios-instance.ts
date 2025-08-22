import axios from 'axios';
import Cookies from 'js-cookie';
const apiClient = axios.create({
  baseURL: '/', // your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
const isCanceled = (err: unknown) => (err as any)?.code === 'ERR_CANCELED';
apiClient.interceptors.request.use(
  config => {
    const token = Cookies.get('accessToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (isCanceled(error) || !originalRequest) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      if (originalRequest.signal?.aborted) {
        return Promise.reject('Original request aborted'); // need update
      }
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }
        const response = (await axios.post(
          'http://localhost:5000/auth/refresh',
          { refreshToken },
          { withCredentials: true },
        )) as any;

        if (response.data?.accessToken) {
          const newAccessToken = response.data.accessToken;
          Cookies.set('accessToken', newAccessToken, { path: '/', sameSite: 'strict' });
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }
        }
        return apiClient({ ...originalRequest, signal: originalRequest.signal });
      } catch (err) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
