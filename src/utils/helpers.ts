import { Environment } from '@/interfaces/general';

const getBaseUrl = (): string => {
  const env = process.env.NODE_ENV;

  if (env === Environment.DEV) {
    return 'http://localhost:5001';
  }

  if (env === Environment.STAGING) {
    return 'STAGING URL HERE';
  }

  return Environment.PROD;
};

export { getBaseUrl };
