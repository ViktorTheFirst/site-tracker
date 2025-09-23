import type { Status } from './general';

const Role = {
  USER: 'user',
  ADMIN: 'admin',
  DEV_ADMIN: 'dev-admin',
} as const;

type Role = (typeof Role)[keyof typeof Role];

const UserStatus = {
  INVITED: 'invited',
  CANCELED: 'canceled',
  ACCEPTED: 'accepted',
} as const;

type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

interface IUser {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  isDisabled: boolean;
  role: Role;
  allowedSiteIds: number[];
  status: UserStatus;
}

interface ILoginResponse {
  status: Status;
  message: string;
  user: IUser;
}

interface IInviteUserRequest {
  email: string;
  allowedSiteIds: string[];
}

interface IInviteUserResponse {
  status: Status;
  message: string;
  id: number;
}

export {
  type IUser,
  type ILoginResponse,
  Role,
  type IInviteUserRequest,
  type IInviteUserResponse,
};
