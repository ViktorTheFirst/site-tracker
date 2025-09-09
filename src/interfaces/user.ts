import type { Status } from './general';

const Role = {
  USER: 'user',
  ADMIN: 'admin',
  DEV_ADMIN: 'dev-admin',
} as const;

type Role = (typeof Role)[keyof typeof Role];

interface IUser {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  isDisabled: boolean;
  role: Role;
}

interface ILoginResponse {
  status: Status;
  message: string;
  user: IUser;
}

export { type IUser, type ILoginResponse, Role };
