import axios, { AxiosError } from 'axios';

import type {
  ILoginResponse,
  ILogoutResponse,
  IUser,
  IVerifyTokenRequest,
  IVerifyTokenResponse,
} from '@/interfaces/user';
import { getBaseUrl } from '@/utils/helpers';

const baseUrl = getBaseUrl();

const loginAPI = async (
  userData: Pick<IUser, 'email' | 'password'>
): Promise<ILoginResponse> => {
  try {
    const result = await axios({
      method: 'post',
      url: `${baseUrl}/api/v1/auth/login`,
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    console.warn('User login failed on FE ' + err);
    throw err as AxiosError;
  }
};

const logoutAPI = async (): Promise<ILogoutResponse> => {
  try {
    const result = await axios({
      method: 'post',
      url: `${baseUrl}/api/v1/auth/logout`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    console.warn('User logout failed on FE ' + err);
    throw err as AxiosError;
  }
};

const verifyTokenAPI = async (
  data: IVerifyTokenRequest
): Promise<IVerifyTokenResponse> => {
  try {
    const result = await axios<
      IVerifyTokenRequest,
      { data: IVerifyTokenResponse }
    >({
      method: 'post',
      data,
      url: `${baseUrl}/api/v1/auth/verify-token`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    console.warn('Token verification api failed on FE ' + err);
    throw err as AxiosError;
  }
};

export { loginAPI, logoutAPI, verifyTokenAPI };
