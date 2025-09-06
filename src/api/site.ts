import axios, { AxiosError } from 'axios';

import { getBaseUrl } from '@/utils/helpers';
import type {
  IAddSiteRequest,
  IAddSiteResponse,
  IEditSiteRequest,
  IGetAllSitesResult,
  IGetSiteResult,
} from '@/interfaces/site';

const baseUrl = getBaseUrl();

const getSiteAPI = async (id: number): Promise<IGetSiteResult> => {
  try {
    const result = await axios<undefined, { data: IGetSiteResult }>({
      method: 'get',
      url: `${baseUrl}/api/v1/site/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    console.warn('Getting site failed on FE ' + err);
    throw err as AxiosError;
  }
};

const addSiteAPI = async (
  siteData: IAddSiteRequest
): Promise<IAddSiteResponse> => {
  try {
    const result = await axios<IAddSiteRequest, { data: IAddSiteResponse }>({
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

const editSiteAPI = async (
  siteData: IEditSiteRequest
): Promise<IAddSiteResponse> => {
  try {
    const result = await axios<IEditSiteRequest, { data: IAddSiteResponse }>({
      method: 'post',
      url: `${baseUrl}/api/v1/site/edit-site`,
      data: siteData,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    console.warn('Editting site failed on FE ' + err);
    throw err as AxiosError;
  }
};

const getAllSitesAPI = async (): Promise<IGetAllSitesResult> => {
  try {
    const result = await axios<undefined, { data: IGetAllSitesResult }>({
      method: 'get',
      url: `${baseUrl}/api/v1/site`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch (err: any) {
    console.warn('Getting sites failed on FE ' + err);
    throw err as AxiosError;
  }
};

export { addSiteAPI, getSiteAPI, editSiteAPI, getAllSitesAPI };
