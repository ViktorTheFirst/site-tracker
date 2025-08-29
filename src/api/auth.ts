import axios, { AxiosError } from 'axios';

import type { ILoginResponse, IUser } from '@/interfaces/user';
import { getBaseUrl } from '@/utils/helpers';

const baseUrl = getBaseUrl();

export const loginAPI = async (
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

    console.log('loginAPI - result', result);

    return result.data;
  } catch (err: any) {
    console.warn('User login failed on FE ' + err);
    throw err as AxiosError;
  }
};
