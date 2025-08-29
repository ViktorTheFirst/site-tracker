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

export { Environment, Status };
