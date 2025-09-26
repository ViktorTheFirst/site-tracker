import axios, { type AxiosRequestConfig, AxiosError } from 'axios';
import { logoutAPI } from './auth';

export const axiosWithLogout = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await axios(config);
    return data;
  } catch (err) {
    const error = err as AxiosError;

    console.log('error in axiosWithLogout', error);

    if (error.response?.status === 403 || error.response?.status === 401) {
      console.warn('403 detected → logging out');
      logoutAPI();
    }

    throw err;
  }
};
