import axios from 'axios';
import { AUTH_TOKEN } from '@/constants';

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

Axios.interceptors.request.use(
  config => {
    const userToken = localStorage.getItem(AUTH_TOKEN);
    if (userToken) {
      config.headers['authorization'] = `${userToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.name === 'AxiosError')
      return Promise.reject({ ...error, message: error.response.data.error });
    return Promise.reject(error);
  }
);

export default Axios;
