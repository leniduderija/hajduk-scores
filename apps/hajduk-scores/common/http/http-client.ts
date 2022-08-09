import { environment } from '../../environments/environment';
import axios, { AxiosResponse } from 'axios';
import { HttpError } from './http';

const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: environment.rapidApiFootballBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': environment.rapidApiFootballKey,
    'X-RapidAPI-Host': environment.rapidApiFootballHost,
  },
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error) => {
    if (error.response) {
      const response: AxiosResponse = error.response;
      return Promise.reject(
        new HttpError(response.status, response.statusText, response.data)
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
