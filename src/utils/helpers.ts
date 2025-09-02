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

const getLinkAddress = (name: string) => {
  if (name.startsWith('http://')) return name;
  if (!name.startsWith('https://')) return `https://${name}`;
  return name;
};

const getSlimName = (name: string) => {
  let noProtocol = name;
  if (noProtocol.startsWith('https://') || noProtocol.startsWith('http://')) {
    noProtocol = name.split('//')[1]; // https://example.net/ ---> example.net/
  }

  return noProtocol.endsWith('/') ? noProtocol.slice(0, -1) : noProtocol; // example.net/ ---> example.net
};

export { getBaseUrl, getLinkAddress, getSlimName };
