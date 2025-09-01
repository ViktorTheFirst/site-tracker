const Environment = {
  DEV: 'development',
  STAGING: 'staging',
  PROD: 'production',
} as const;

type Environment = (typeof Environment)[keyof typeof Environment];

const Status = {
  SUCCESS: 'success',
  FAIL: 'failure',
} as const;

type Status = (typeof Status)[keyof typeof Status];

const SiteStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

type SiteStatus = (typeof SiteStatus)[keyof typeof SiteStatus];

export { Environment, Status, SiteStatus };
