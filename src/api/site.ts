import axios, { AxiosError } from 'axios';

import type { ILoginResponse } from '@/interfaces/user';
import { getBaseUrl } from '@/utils/helpers';
import type { IAddSiteRequest } from '@/interfaces/site';

const baseUrl = getBaseUrl();

const addSiteAPI = async (
  siteData: IAddSiteRequest
): Promise<ILoginResponse> => {
  try {
    const result = await axios({
      method: 'post',
      url: `${baseUrl}/api/v1/site`,
      data: siteData,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    console.warn('Adding site failed on FE ' + err);
    throw err as AxiosError;
  }
};

export { addSiteAPI };
