import { Environment } from '@/interfaces/general';

const getBaseUrl = (): string => {
  const env = import.meta.env.MODE;

  console.log('env', env);

  if (env === Environment.DEV) {
    return 'http://localhost:5001';
  }

  if (env === Environment.PROD) {
    return 'https://site-tracker-be.viktor-indie.com';
  }

  return 'http://localhost:5001';
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

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const areArraysDifferent = (arr1: number[], arr2: number[]): boolean => {
  if (!arr1 || !arr2) return true;
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return true;

  return (
    JSON.stringify([...arr1].sort((a, b) => a - b)) !==
    JSON.stringify([...arr2].sort((a, b) => a - b))
  );
};

export {
  getBaseUrl,
  getLinkAddress,
  getSlimName,
  isValidEmail,
  areArraysDifferent,
};
