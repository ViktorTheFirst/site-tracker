import type { SiteStatus as SiteStatusType } from '@/interfaces/general';

interface ISiteRecord {
  id?: string;
  name: string;
  hostingProvider: string;
  hostingLogin: string;
  hostingPassword: string;
  hostingValiduntil: string;

  domainRegistrar: string;
  domainLogin: string;
  domainPassword: string;
  domainValiduntil: string;

  comments: string;
  status: SiteStatusType;
  lastModifiedBy: string;
}

interface IAddSiteRequest {
  name: string;
  hostingProvider: string;
  hostingLogin: string;
  hostingPassword: string;
  hostingValiduntil: Date;

  domainRegistrar: string;
  domainLogin: string;
  domainPassword: string;
  domainValiduntil: Date;

  comments: string;
  status: SiteStatusType;
}

export type { ISiteRecord, IAddSiteRequest };
