import axios, { AxiosError } from 'axios';

import { getBaseUrl } from '@/utils/helpers';
import type {
  IGetUsersResponse,
  IInviteUserRequest,
  IInviteUserResponse,
} from '@/interfaces/user';

const baseUrl = getBaseUrl();

const inviteUserAPI = async (
  userData: IInviteUserRequest
): Promise<IInviteUserResponse> => {
  try {
    const result = await axios<
      IInviteUserRequest,
      { data: IInviteUserResponse }
    >({
      method: 'post',
      url: `${baseUrl}/api/v1/user/invite`,
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 400) {
        return err.response.data;
      }
    }
    console.warn('Inviting user failed on FE ' + err);
    throw err as AxiosError;
  }
};

const getUsersAPI = async (): Promise<IGetUsersResponse> => {
  try {
    const result = await axios<undefined, { data: IGetUsersResponse }>({
      method: 'get',
      url: `${baseUrl}/api/v1/user`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 400) {
        return err.response.data;
      }
    }
    console.warn('Fetching users failed on FE ' + err);
    throw err as AxiosError;
  }
};

export { inviteUserAPI, getUsersAPI };
